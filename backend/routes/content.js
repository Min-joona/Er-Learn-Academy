const express = require('express');
const { Course, Lesson, Quiz, Flashcard, Placement, Exam, TypingDrill } = require('../models/Content');

const router = express.Router();

// GET /api/courses  (optionally ?category=)
router.get('/courses', async (req, res) => {
  const filter = {};
  if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
  res.json(await Course.find(filter).sort({ category: 1 }));
});

router.get('/courses/:slug', async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  const [lessons, quizzes, flashcards, exams, placement] = await Promise.all([
    Lesson.find({ courseSlug: course.slug }).sort({ level: 1, order: 1 }),
    Quiz.find({ courseSlug: course.slug }),
    Flashcard.find({ courseSlug: course.slug }),
    Exam.find({ courseSlug: course.slug }),
    Placement.findOne({ courseSlug: course.slug }),
  ]);
  res.json({ course, lessons, quizzes, flashcards, exams, placement });
});

// GET /api/content/placement/:slug
router.get('/placement/:slug', async (req, res) => {
  const placement = await Placement.findOne({ courseSlug: req.params.slug });
  if (!placement) return res.status(404).json({ message: 'No placement test' });
  res.json(placement);
});

// GET /api/content/typing
router.get('/typing', async (_req, res) => {
  res.json(await TypingDrill.find().sort({ order: 1 }));
});

module.exports = router;
