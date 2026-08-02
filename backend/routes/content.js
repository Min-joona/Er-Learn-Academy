const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Course, Lesson, Quiz, Flashcard, Placement, Exam, TypingDrill } = require('../models/Content');

const router = express.Router();

const optionalAuth = async (req) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    return await User.findById(decoded.id).select('-loginAttempts -lockUntil');
  } catch { return null; }
};

router.get('/courses', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && typeof req.query.category === 'string' && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    res.json(await Course.find(filter).sort({ category: 1 }));
  } catch { res.status(500).json({ message: 'Failed to fetch courses' }); }
});

router.get('/courses/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const user = await optionalAuth(req);
    const isEnrolled = user?.enrollments?.some((e) => e.courseSlug === course.slug);
    const isFree = !course.price || course.price <= 0;
    if (!isFree && !isEnrolled) {
      const sanitized = { ...course.toObject() };
      delete sanitized.levels;
      delete sanitized.modules;
      return res.json({ course: sanitized, locked: true, message: 'Purchase required to access content' });
    }
    const [lessons, quizzes, flashcards, exams, placement] = await Promise.all([
      Lesson.find({ courseSlug: course.slug }).sort({ level: 1, order: 1 }),
      Quiz.find({ courseSlug: course.slug }),
      Flashcard.find({ courseSlug: course.slug }),
      Exam.find({ courseSlug: course.slug }),
      Placement.findOne({ courseSlug: course.slug }),
    ]);
    res.json({ course, lessons, quizzes, flashcards, exams, placement, locked: false });
  } catch { res.status(500).json({ message: 'Failed to load course' }); }
});

router.get('/placement/:slug', async (req, res) => {
  try {
    const placement = await Placement.findOne({ courseSlug: req.params.slug });
    if (!placement) return res.status(404).json({ message: 'No placement test' });
    res.json(placement);
  } catch { res.status(500).json({ message: 'Failed to load placement test' }); }
});

router.get('/typing', async (_req, res) => {
  try {
    res.json(await TypingDrill.find().sort({ order: 1 }));
  } catch { res.status(500).json({ message: 'Failed to load typing drills' }); }
});

module.exports = router;
