/** Seed Eritrea Learn Academy. Usage: npm run seed */
require('dotenv').config();
const mongoose = require('mongoose');
const runSeed = require('./seedRunner');

runSeed()
  .then((r) => {
    console.log('✓ Eritrea Learn Academy seeded:');
    console.log(`  ${r.courses} courses · ${r.lessons} lessons · ${r.typingDrills} typing drills`);
    console.log(`  ${r.quizzes} quizzes · ${r.flashcards} decks · ${r.exams} exams · ${r.placements} placement tests`);
    console.log('  Login: amar@erilearn.io / demo123');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
  });
