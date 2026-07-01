/** Seed Eritrea Learn Academy. Usage: npm run seed */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const { Course, Lesson, Quiz, Flashcard, Placement, Exam, TypingDrill } = require('./models/Content');
const data = require('./data/content');

const run = async () => {
  try {
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

    console.log('✓ Eritrea Learn Academy seeded:');
    console.log(`  ${data.courses.length} courses · ${data.lessons.length} lessons · ${data.typingDrills.length} typing drills`);
    console.log(`  ${data.quizzes.length} quizzes · ${data.flashcards.length} decks · ${data.exams.length} exams · ${data.placements.length} placement tests`);
    console.log('  Login: amar@erilearn.io / demo123');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

run();
