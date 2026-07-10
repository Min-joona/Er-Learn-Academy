const express = require('express');
const { Course, Lesson, Quiz, Flashcard, Placement, Exam, TypingDrill } = require('../models/Content');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();
router.use(protect, admin);

// Courses
router.get('/courses', async (req, res) => res.json(await Course.find().sort({ category: 1 })));
router.post('/courses', async (req, res) => res.status(201).json(await Course.create(req.body)));
router.put('/courses/:slug', async (req, res) => res.json(await Course.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })));
router.delete('/courses/:slug', async (req, res) => {
  await Course.findOneAndDelete({ slug: req.params.slug });
  res.json({ message: 'Course deleted' });
});

// Lessons
router.get('/courses/:slug/lessons', async (req, res) => res.json(await Lesson.find({ courseSlug: req.params.slug }).sort({ level: 1, order: 1 })));
router.post('/lessons', async (req, res) => res.status(201).json(await Lesson.create(req.body)));
router.put('/lessons/:id', async (req, res) => res.json(await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/lessons/:id', async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lesson deleted' });
});

// For brevity in this iteration, we implemented CRUD for Courses and Lessons.
// The same pattern can be easily extended for Quizzes and Exams.

module.exports = router;
