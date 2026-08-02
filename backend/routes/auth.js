const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Course } = require('../models/Content');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { authLimiter, registerLimiter } = require('../middleware/security');
const { securityEvent } = require('../utils/logger');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const { notifyRegistration, notifyLogin, notifyEnrollment, notifyPurchase } = require('../utils/email');

const router = express.Router();
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '30d' });
const publicUser = (u) => ({ _id: u._id, name: u.name, email: u.email, role: u.role, avatar: u.avatar, coverImage: u.coverImage, bio: u.bio, location: u.location, website: u.website, enrollments: u.enrollments });

router.post('/register', registerLimiter, validate('register'), async (req, res) => {
  try {
    const { name, email, password } = req.validated;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    securityEvent('user_registered', { email, userId: user._id });
    notifyRegistration(user);
    res.status(201).json({ user: publicUser(user), token: signToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', authLimiter, validate('login'), async (req, res) => {
  try {
    const { email, password } = req.validated;
    const user = await User.findOne({ email }).select('+password +loginAttempts +lockUntil');
    if (!user) {
      securityEvent('login_failed', { email, reason: 'user_not_found', ip: req.ip });
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.isLocked) {
      securityEvent('login_blocked_locked', { email, userId: user._id, ip: req.ip });
      return res.status(423).json({ message: 'Account locked. Try again in 15 minutes.' });
    }
    if (!(await user.matchPassword(password))) {
      await user.incrementLoginAttempts();
      securityEvent('login_failed', { email, userId: user._id, reason: 'wrong_password', ip: req.ip });
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    await user.resetLoginAttempts();
    securityEvent('login_success', { email, userId: user._id, ip: req.ip });
    notifyLogin(user);
    res.json({ user: publicUser(user), token: signToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', protect, (req, res) => res.json({ user: publicUser(req.user) }));

router.post('/enroll', protect, validate('enroll'), async (req, res) => {
  const { courseSlug, instructionLanguage, placementScore, totalQuestions } = req.validated;
  const ratio = totalQuestions ? placementScore / totalQuestions : 0;
  const level = ratio >= 0.8 ? 'Advanced' : ratio >= 0.5 ? 'Intermediate' : 'Beginner';
  const existing = req.user.enrollments.find((e) => e.courseSlug === courseSlug);
  if (existing) {
    existing.instructionLanguage = instructionLanguage;
    existing.level = level;
    existing.placementScore = placementScore;
  } else {
    req.user.enrollments.push({ courseSlug, instructionLanguage, level, placementScore, progress: 0 });
  }
  await req.user.save();
    securityEvent('enrolled', { courseSlug, userId: req.user._id, level });
    notifyEnrollment(req.user, courseSlug, level);
    res.json({ user: publicUser(req.user), assignedLevel: level });
});

router.post('/purchase', protect, validate('purchase'), async (req, res) => {
  const { courseSlug } = req.validated;
  const course = await Course.findOne({ slug: courseSlug });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  if (!course.price || course.price <= 0) return res.status(400).json({ message: 'Course is free — use /enroll instead' });
  const existing = req.user.enrollments.find((e) => e.courseSlug === courseSlug);
  if (existing) return res.json({ user: publicUser(req.user), message: 'Already enrolled' });
  req.user.enrollments.push({ courseSlug, instructionLanguage: 'English', level: 'Beginner', progress: 0 });
  await req.user.save();
  securityEvent('purchased', { courseSlug, userId: req.user._id });
  notifyPurchase(req.user, courseSlug);
  res.json({ user: publicUser(req.user), message: 'Course purchased and enrolled' });
});

router.post('/progress', protect, validate('progress'), async (req, res) => {
  const { courseSlug, progress } = req.validated;
  const e = req.user.enrollments.find((x) => x.courseSlug === courseSlug);
  if (e) { e.progress = Math.max(e.progress, Math.min(100, progress)); await req.user.save(); }
  res.json({ user: publicUser(req.user) });
});

router.put('/settings', protect, validate('settings'), async (req, res) => {
  try {
    const { name, bio, location, website, currentPassword, newPassword } = req.validated;
    if (name !== undefined) req.user.name = name;
    if (bio !== undefined) req.user.bio = bio;
    if (location !== undefined) req.user.location = location;
    if (website !== undefined) req.user.website = website;
    if (currentPassword && newPassword) {
      const user = await User.findById(req.user._id).select('+password');
      if (!(await user.matchPassword(currentPassword))) {
        securityEvent('password_change_failed', { userId: req.user._id, reason: 'wrong_current_password' });
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = newPassword;
      await user.save();
      securityEvent('password_changed', { userId: req.user._id });
    } else {
      await req.user.save();
    }
    res.json({ user: publicUser(req.user), message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ message: 'Settings update failed' });
  }
});

router.put('/upload', protect, async (req, res) => {
  try {
    const { type, data } = req.body;
    if (!type || !data) return res.status(400).json({ message: 'Missing type or data' });
    if (!['avatar', 'coverImage'].includes(type)) return res.status(400).json({ message: 'Invalid type' });
    if (data.length > 5 * 1024 * 1024) return res.status(400).json({ message: 'File too large (max 5MB)' });
    const oldPublicId = req.user[`${type}PublicId`];
    const result = await uploadImage(data, `eritrea-academy/${type}s`);
    if (oldPublicId) await deleteImage(oldPublicId).catch(() => {});
    req.user[type] = result.url;
    req.user[`${type}PublicId`] = result.publicId;
    await req.user.save();
    res.json({ user: publicUser(req.user), message: `${type} updated` });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
