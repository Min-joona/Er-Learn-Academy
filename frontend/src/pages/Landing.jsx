import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Headphones, PenTool, Keyboard, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../api/client';

const features = [
  { icon: BookOpen, title: 'Read', desc: 'Clear, bite-sized lessons you can follow at your own pace.' },
  { icon: Headphones, title: 'Listen', desc: 'Hear every phrase and repeat until it sticks.' },
  { icon: PenTool, title: 'Practice', desc: 'Real exercises — including tasks on your own computer.' },
  { icon: Keyboard, title: 'Type', desc: 'Learn to type fast without looking, the fun way.' },
];

export default function Landing() {
  const [courses, setCourses] = useState([]);
  useEffect(() => { api.get('/api/content/courses').then(({ data }) => setCourses(data)); }, []);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="pill bg-teal/10 text-teal">ሕጂ ምምዝጋብ ይከኣል · Enroll now</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] md:text-5xl">
            Learn English, computers & world languages —
            <span className="text-teal"> in your language.</span>
          </h1>
          <p className="mt-5 max-w-md text-ink/70">
            Built for Eritreans. Choose to learn in <strong>Tigrigna</strong>, <strong>English</strong>, or <strong>Arabic</strong>.
            Take a quick level test, then learn by reading, listening, and practicing — with quizzes and real exams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/courses" className="btn-primary">Browse courses <ArrowRight size={18} /></Link>
            <Link to="/typing" className="btn-outline"><Keyboard size={18} /> Try typing free</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
            {['No prior knowledge needed', 'Learn at your own pace', 'Theory + practical exams'].map((t) => (
              <span key={t} className="flex items-center gap-1"><CheckCircle2 size={15} className="text-teal" /> {t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=700&fit=crop" alt="Students learning" className="h-full w-full object-cover" />
        </motion.div>
      </section>

      {/* How you learn */}
      <section className="border-y border-ink/5 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/10 text-teal"><Icon size={22} /></span>
              <div>
                <h3 className="font-display font-bold">{title}</h3>
                <p className="text-sm text-ink/60">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold">Our courses</h2>
            <p className="mt-1 text-ink/60">Pick a path and start today.</p>
          </div>
          <Link to="/courses" className="text-sm font-semibold text-teal">See all →</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c.slug} to={`/courses/${c.slug}`} className="card group overflow-hidden p-0 transition hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-lg">{c.flag}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                  <span className="pill bg-teal/10 text-teal">{c.price === 0 ? 'Free' : `$${c.price}`}</span>
                </div>
                <p className="mt-1 text-sm text-ink/60 line-clamp-2">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.instructionLanguages.map((l) => <span key={l} className="pill bg-ink/5 text-ink/50">{l}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-ink/5 bg-white py-8 text-center text-sm text-ink/50">
        <p>ሕቶ ኣለኩም? Questions? Reach us anytime.</p>
        <p className="mt-1">© {new Date().getFullYear()} Eritrea Learn Academy — built by Amar Hassen Mohammednur.</p>
      </footer>
    </div>
  );
}
