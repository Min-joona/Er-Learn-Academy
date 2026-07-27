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
  await Lesson.deleteMany({ courseSlug: req.params.slug });
  await Quiz.deleteMany({ courseSlug: req.params.slug });
  res.json({ message: 'Course and associated content deleted' });
});

// Lessons
router.get('/courses/:slug/lessons', async (req, res) => res.json(await Lesson.find({ courseSlug: req.params.slug }).sort({ level: 1, order: 1 })));
router.post('/lessons', async (req, res) => res.status(201).json(await Lesson.create(req.body)));
router.put('/lessons/:id', async (req, res) => res.json(await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/lessons/:id', async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lesson deleted' });
});

// Quizzes
router.post('/quizzes', async (req, res) => res.status(201).json(await Quiz.create(req.body)));
router.put('/quizzes/:id', async (req, res) => res.json(await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/quizzes/:id', async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quiz deleted' });
});

// Typing drills
router.post('/typing-drills', async (req, res) => res.status(201).json(await TypingDrill.create(req.body)));
router.put('/typing-drills/:id', async (req, res) => res.json(await TypingDrill.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/typing-drills/:id', async (req, res) => {
  await TypingDrill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Drill deleted' });
});

module.exports = router;
