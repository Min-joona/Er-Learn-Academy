const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const enrollmentSchema = new mongoose.Schema(
  {
    courseSlug: { type: String, required: true },
    instructionLanguage: { type: String, default: 'English' }, // Tigrigna / English / Arabic
    level: { type: String, default: 'Beginner' }, // assigned after placement test
    progress: { type: Number, default: 0 }, // % complete
    placementScore: { type: Number, default: 0 },
  },
  { _id: false, timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    enrollments: [enrollmentSchema],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
