import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Compass } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => { api.get('/api/content/courses').then(({ data }) => setCourses(data)); }, []);

  const byslug = Object.fromEntries(courses.map((c) => [c.slug, c]));
  const enrolled = (user?.enrollments || []).map((e) => ({ ...e, course: byslug[e.courseSlug] })).filter((e) => e.course);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="font-display text-3xl font-extrabold">Hi {user.name.split(' ')[0]}, welcome back 👋</h1>
      <p className="mt-1 text-ink/60">Pick up where you left off.</p>

      <h2 className="mt-8 font-display text-xl font-extrabold">My courses</h2>
      {enrolled.length === 0 ? (
        <div className="mt-4 card text-center">
          <Compass className="mx-auto text-teal" />
          <p className="mt-2 text-ink/60">You're not enrolled in any course yet.</p>
          <Link to="/courses" className="btn-primary mt-4">Browse courses</Link>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolled.map((e) => (
            <Link key={e.courseSlug} to={`/courses/${e.courseSlug}`} className="card transition hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{e.course.flag}</span>
                <span className="pill bg-teal/10 text-teal">{e.level}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold">{e.course.title}</h3>
              <p className="text-xs text-ink/50">Learning in {e.instructionLanguage}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-teal" style={{ width: `${e.progress}%` }} />
              </div>
              <p className="mt-1 flex items-center justify-between text-xs text-ink/50">{e.progress}% complete <ArrowRight size={14} /></p>
            </Link>
          ))}
        </div>
      )}

      <h2 className="mt-10 font-display text-xl font-extrabold">Explore more</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.filter((c) => !enrolled.find((e) => e.courseSlug === c.slug)).slice(0, 3).map((c) => (
          <Link key={c.slug} to={`/courses/${c.slug}`} className="card flex items-center gap-3 transition hover:-translate-y-1">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-xl">{c.flag}</span>
            <div className="flex-1"><p className="font-bold">{c.title}</p><p className="text-xs text-ink/50">{c.category}</p></div>
            <BookOpen size={16} className="text-ink/30" />
          </Link>
        ))}
      </div>
    </div>
  );
}
