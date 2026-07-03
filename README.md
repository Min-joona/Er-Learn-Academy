# Eritrea Learn Academy

A multilingual e-learning platform built for Eritrean learners. Courses in English, computer skills, world languages, and touch typing are taught in the learner's own language — Tigrigna, English, or Arabic — with placement testing, skill-appropriate lessons, and both theoretical and practical assessment.

**Live demo:** [er-learn-academy.vercel.app](https://er-learn-academy.vercel.app)

## Overview

- **Eight courses** — English, Computer Skills, Arabic, Amharic, Korean, Chinese, Russian, and Typing Mastery
- **Adaptive enrollment** — learners choose an instruction language, take a short placement test, and are assigned a level automatically
- **Multi-modal lessons** — reading lessons, listening lessons (Web Speech API), and hands-on practice tasks performed on the learner's own computer
- **Assessment** — quizzes and flashcards for practice; theoretical (multiple-choice) and practical (task-based) final exams
- **Typing Mastery** — a live words-per-minute trainer with accuracy tracking, progressing from home row to full-speed sentences
- **Progress tracking** — per-course completion persisted to the learner's account

## Architecture

```
eritrea-academy/
├── backend/          Express REST API
│   ├── models/       User (enrollments), Course, Lesson, Quiz,
│   │                 Flashcard, Placement, Exam, TypingDrill
│   └── routes/       /api/content · /api/auth
└── frontend/         React app (Vite)
    └── src/
        └── pages/    Landing, Courses, CourseDetail (enrollment flow,
                      lesson player, exams), Typing, Dashboard
```

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React 18, Vite, Tailwind CSS, Web Speech API           |
| Backend    | Node.js, Express, Mongoose                             |
| Database   | MongoDB Atlas                                          |
| Security   | Helmet, rate limiting, input sanitization, JWT         |

## Getting Started

**Prerequisites:** Node.js 18+ and a MongoDB connection string.

```bash
# API
cd backend
npm install
cp .env.example .env   # configure environment
npm run seed           # optional: load course catalog and lessons
npm run dev

# App
cd frontend
npm install
npm run dev
```

Environment variables are documented in [`backend/.env.example`](backend/.env.example) and [`frontend/.env.example`](frontend/.env.example).

## Author

**Amar Hassen Mohammednur** — [github.com/Min-joona](https://github.com/Min-joona)

## License

MIT
