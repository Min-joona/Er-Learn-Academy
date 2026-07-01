const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    titleTi: String, // Tigrigna title
    category: { type: String, enum: ['English', 'Computer', 'Language', 'Typing'], required: true },
    flag: String, // emoji
    description: String,
    price: { type: Number, default: 0 },
    levels: [String], // e.g. ['Beginner','Intermediate','Advanced']
    instructionLanguages: [String], // Tigrigna / English / Arabic
    image: String,
    modules: [String], // curriculum outline
    focus: [String], // Reading, Listening, Practice, Typing…
  },
  { timestamps: true }
);

const lessonSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, required: true, index: true },
    level: { type: String, default: 'Beginner' },
    order: { type: Number, default: 0 },
    title: { type: String, required: true },
    type: { type: String, enum: ['Reading', 'Listening', 'Practice'], default: 'Reading' },
    body: String, // reading text / practice instructions
    listenText: String, // text for the browser speech synthesis (listening lessons)
    videoId: String, // optional YouTube id
    practiceTask: String, // for computer practice lessons
  },
  { timestamps: true }
);

const quizSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, index: true },
    title: String,
    level: String,
    questions: [{ prompt: String, options: [String], answer: Number, explanation: String }],
  },
  { timestamps: true }
);

const flashcardSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, index: true },
    title: String,
    cards: [{ front: String, back: String }],
  },
  { timestamps: true }
);

// Placement test — score maps to an assigned level.
const placementSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, index: true },
    questions: [{ prompt: String, options: [String], answer: Number }],
  },
  { timestamps: true }
);

const examSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, index: true },
    level: String,
    kind: { type: String, enum: ['Theoretical', 'Practical'], default: 'Theoretical' },
    title: String,
    // theoretical: MCQs; practical: task checklist
    questions: [{ prompt: String, options: [String], answer: Number }],
    tasks: [String],
  },
  { timestamps: true }
);

const typingDrillSchema = new mongoose.Schema(
  {
    level: { type: String, default: 'Beginner' },
    order: Number,
    title: String,
    text: { type: String, required: true },
    targetWpm: { type: Number, default: 20 },
    tip: String,
  },
  { timestamps: true }
);

module.exports = {
  Course: mongoose.models.Course || mongoose.model('Course', courseSchema),
  Lesson: mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema),
  Quiz: mongoose.models.EAQuiz || mongoose.model('EAQuiz', quizSchema),
  Flashcard: mongoose.models.EAFlashcard || mongoose.model('EAFlashcard', flashcardSchema),
  Placement: mongoose.models.Placement || mongoose.model('Placement', placementSchema),
  Exam: mongoose.models.Exam || mongoose.model('Exam', examSchema),
  TypingDrill: mongoose.models.TypingDrill || mongoose.model('TypingDrill', typingDrillSchema),
};
