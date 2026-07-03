/** Core seed logic, reused by the CLI (seed.js) and the guarded /api/seed route. */
const connectDB = require('./config/db');
const User = require('./models/User');
const { Course, Lesson, Quiz, Flashcard, Placement, Exam, TypingDrill } = require('./models/Content');
const data = require('./data/content');

async function runSeed() {
  await connectDB();
  await Promise.all([
    User.deleteMany(), Course.deleteMany(), Lesson.deleteMany(), Quiz.deleteMany(),
    Flashcard.deleteMany(), Placement.deleteMany(), Exam.deleteMany(), TypingDrill.deleteMany(),
  ]);

  for (const u of data.users) await User.create(u);
  await Course.insertMany(data.courses);
  await Lesson.insertMany(data.lessons);
  await Quiz.insertMany(data.quizzes);
  await Flashcard.insertMany(data.flashcards);
  await Placement.insertMany(data.placements);
  await Exam.insertMany(data.exams);
  await TypingDrill.insertMany(data.typingDrills);

  return {
    courses: data.courses.length, lessons: data.lessons.length, typingDrills: data.typingDrills.length,
    quizzes: data.quizzes.length, flashcards: data.flashcards.length, exams: data.exams.length,
    placements: data.placements.length,
  };
}

module.exports = runSeed;
