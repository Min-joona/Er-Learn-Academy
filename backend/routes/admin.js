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
router.get('/courses/:slug/typing-drills', async (req, res) => res.json(await TypingDrill.find({ courseSlug: req.params.slug }).sort({ level: 1 })));
router.post('/typing-drills', async (req, res) => res.status(201).json(await TypingDrill.create(req.body)));
router.put('/typing-drills/:id', async (req, res) => res.json(await TypingDrill.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/typing-drills/:id', async (req, res) => {
  await TypingDrill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Drill deleted' });
});

// Flashcards
router.get('/courses/:slug/flashcards', async (req, res) => res.json(await Flashcard.find({ courseSlug: req.params.slug }).sort({ level: 1 })));
router.post('/flashcards', async (req, res) => res.status(201).json(await Flashcard.create(req.body)));
router.put('/flashcards/:id', async (req, res) => res.json(await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/flashcards/:id', async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.json({ message: 'Flashcard deleted' });
});

// Exams
router.get('/courses/:slug/exams', async (req, res) => res.json(await Exam.find({ courseSlug: req.params.slug }).sort({ level: 1 })));
router.post('/exams', async (req, res) => res.status(201).json(await Exam.create(req.body)));
router.put('/exams/:id', async (req, res) => res.json(await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/exams/:id', async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.json({ message: 'Exam deleted' });
});

// Placement
router.get('/courses/:slug/placement', async (req, res) => res.json(await Placement.find({ courseSlug: req.params.slug })));
router.post('/placement', async (req, res) => res.status(201).json(await Placement.create(req.body)));
router.put('/placement/:id', async (req, res) => res.json(await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/placement/:id', async (req, res) => {
  await Placement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Placement deleted' });
});

// Teachers
router.get('/teachers', async (req, res) => {
  const User = require('mongoose').model('User');
  res.json(await User.find({ role: 'teacher' }).select('-password'));
});

// Users (admin only)
router.get('/users', async (req, res) => {
  const User = require('mongoose').model('User');
  res.json(await User.find().select('-password').sort({ createdAt: -1 }));
});

module.exports = router;
