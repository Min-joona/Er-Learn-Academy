const express = require('express');
const { Course, Lesson, Quiz, Flashcard, Placement, Exam, TypingDrill } = require('../models/Content');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();
router.use(protect, admin);

function wrap(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(() => res.status(500).json({ message: 'Operation failed' }));
}

router.get('/courses', wrap(async (req, res) => res.json(await Course.find().sort({ category: 1 }))));
router.post('/courses', wrap(async (req, res) => res.status(201).json(await Course.create(req.body))));
router.put('/courses/:slug', wrap(async (req, res) => res.json(await Course.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }))));
router.delete('/courses/:slug', wrap(async (req, res) => {
  await Course.findOneAndDelete({ slug: req.params.slug });
  await Lesson.deleteMany({ courseSlug: req.params.slug });
  await Quiz.deleteMany({ courseSlug: req.params.slug });
  res.json({ message: 'Course and associated content deleted' });
}));

router.get('/courses/:slug/lessons', wrap(async (req, res) => res.json(await Lesson.find({ courseSlug: req.params.slug }).sort({ level: 1, order: 1 }))));
router.post('/lessons', wrap(async (req, res) => res.status(201).json(await Lesson.create(req.body))));
router.put('/lessons/:id', wrap(async (req, res) => res.json(await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
router.delete('/lessons/:id', wrap(async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lesson deleted' });
}));

router.post('/quizzes', wrap(async (req, res) => res.status(201).json(await Quiz.create(req.body))));
router.put('/quizzes/:id', wrap(async (req, res) => res.json(await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
router.delete('/quizzes/:id', wrap(async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quiz deleted' });
}));

router.get('/courses/:slug/typing-drills', wrap(async (req, res) => res.json(await TypingDrill.find({ courseSlug: req.params.slug }).sort({ level: 1 }))));
router.post('/typing-drills', wrap(async (req, res) => res.status(201).json(await TypingDrill.create(req.body))));
router.put('/typing-drills/:id', wrap(async (req, res) => res.json(await TypingDrill.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
router.delete('/typing-drills/:id', wrap(async (req, res) => {
  await TypingDrill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Drill deleted' });
}));

router.get('/courses/:slug/flashcards', wrap(async (req, res) => res.json(await Flashcard.find({ courseSlug: req.params.slug }).sort({ level: 1 }))));
router.post('/flashcards', wrap(async (req, res) => res.status(201).json(await Flashcard.create(req.body))));
router.put('/flashcards/:id', wrap(async (req, res) => res.json(await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
router.delete('/flashcards/:id', wrap(async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.json({ message: 'Flashcard deleted' });
}));

router.get('/courses/:slug/exams', wrap(async (req, res) => res.json(await Exam.find({ courseSlug: req.params.slug }).sort({ level: 1 }))));
router.post('/exams', wrap(async (req, res) => res.status(201).json(await Exam.create(req.body))));
router.put('/exams/:id', wrap(async (req, res) => res.json(await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
router.delete('/exams/:id', wrap(async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.json({ message: 'Exam deleted' });
}));

router.get('/courses/:slug/placement', wrap(async (req, res) => res.json(await Placement.find({ courseSlug: req.params.slug }))));
router.post('/placement', wrap(async (req, res) => res.status(201).json(await Placement.create(req.body))));
router.put('/placement/:id', wrap(async (req, res) => res.json(await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true }))));
router.delete('/placement/:id', wrap(async (req, res) => {
  await Placement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Placement deleted' });
}));

router.get('/teachers', wrap(async (req, res) => res.json(await User.find({ role: 'teacher' }).select('-password -loginAttempts -lockUntil'))));

router.get('/users', wrap(async (req, res) => res.json(await User.find().select('-password -loginAttempts -lockUntil').sort({ createdAt: -1 }))));

module.exports = router;
