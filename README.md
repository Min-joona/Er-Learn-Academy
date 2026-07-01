# Eritrea Learn Academy 🎓

[![MERN](https://img.shields.io/badge/Stack-MERN-brightgreen)](#)

A teaching platform built for Eritreans — learn **English**, **computer skills**, and
**world languages** (Arabic, Amharic, Korean, Chinese, Russian), taught in your own
language: **Tigrigna, English, or Arabic**. Reading-, listening-, and practice-first
(not video-first), with quizzes, flashcards, real exams, and a fun **typing course**.

> Built by **Amar Hassen Mohammednur**. Inspired by the layout of Nahom Tech Academy.

## ✨ Features

- **8 courses** — English, Computer Skills, Arabic, Amharic, Korean, Chinese, Russian, Typing
- **Smart enrollment** — pick your instruction language (Tigrigna / English / Arabic),
  take a **placement test**, and get auto-assigned to Beginner / Intermediate / Advanced
- **Learn by doing** — Reading lessons, **Listening** lessons (browser text-to-speech),
  and **Practice** tasks (including real "do this on your computer" exercises)
- **Quizzes & flashcards** with instant feedback
- **Exams** — both **Theoretical** (MCQ) and **Practical** (task checklists)
- **Typing Mastery** — live WPM + accuracy tester, home-row → speed drills, funny tips
- Progress tracking per course · fully **mobile-responsive**

## 🧱 Tech Stack

React 18 · Vite · Tailwind CSS · Framer Motion · Node.js · Express · Mongoose · MongoDB · JWT
· Web Speech API (listening)

## 🚀 Getting Started

### Backend
```bash
cd backend && npm install
cp .env.example .env       # set MONGODB_URI + JWT_SECRET
npm run seed               # loads 8 courses, lessons, typing drills, quizzes, exams…
npm run dev                # http://localhost:5003
```

### Frontend
```bash
cd frontend && npm install
npm run dev                # http://localhost:5173
```

**Login:** `amar@erilearn.io` / `demo123`

## 📝 Note on content
Explain-video slots use YouTube placeholders — swap in your own recordings later.
Typing drills follow a typing.com-style progression.

## ☁️ Deployment
Two Vercel projects: `backend/` (env: `MONGODB_URI`, `JWT_SECRET`, `ALLOWED_ORIGINS`, `VERCEL=1`)
and `frontend/` (env: `VITE_API_URL`). Seed once against Atlas.

## 📄 License
MIT
