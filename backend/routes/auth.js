const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
const publicUser = (u) => ({ _id: u._id, name: u.name, email: u.email, enrollments: u.enrollments });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: publicUser(user), token: signToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ user: publicUser(user), token: signToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/me', protect, (req, res) => res.json({ user: publicUser(req.user) }));

// Enroll after placement test — level assigned from score.
router.post('/enroll', protect, async (req, res) => {
  const { courseSlug, instructionLanguage, placementScore, totalQuestions } = req.body;
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
  res.json({ user: publicUser(req.user), assignedLevel: level });
});

// Update progress on a course.
router.post('/progress', protect, async (req, res) => {
  const { courseSlug, progress } = req.body;
  const e = req.user.enrollments.find((x) => x.courseSlug === courseSlug);
  if (e) { e.progress = Math.max(e.progress, Math.min(100, progress)); await req.user.save(); }
  res.json({ user: publicUser(req.user) });
});

module.exports = router;
