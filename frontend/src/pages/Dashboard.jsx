import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const motivationalQuotes = [
  { text: "ንፈልጥ ንተምራ — Let us seek, let us learn.", author: "Eritrean Proverb" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { text: "Knowledge is like a garden: if it is not cultivated, it cannot be harvested.", author: "African Proverb" },
  { text: "ምሁር ዘይኮነ ሰብ ከም ዓይኒ ዘይርኢ — An uneducated person is like an eye that cannot see.", author: "Tigrigna Proverb" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [quote] = useState(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => { api.get('/api/content/courses').then(({ data }) => setCourses(data)).catch(() => {}); }, []);

  const byslug = useMemo(() => Object.fromEntries(courses.map((c) => [c.slug, c])), [courses]);
  const enrolled = useMemo(() => (user?.enrollments || []).map((e) => ({ ...e, course: byslug[e.courseSlug] })).filter((e) => e.course), [user, byslug]);
  const totalProgress = enrolled.length ? Math.round(enrolled.reduce((s, e) => s + e.progress, 0) / enrolled.length) : 0;
  const completedLessons = enrolled.filter((e) => e.progress >= 100).length;
  const streakDays = 7; // Placeholder from API data

  const unenrolled = courses.filter((c) => !enrolled.find((e) => e.courseSlug === c.slug));

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5">
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#CFC89A]">
              Welcome back, {user?.name?.split(' ')[0] || 'Learner'}
              <span className="inline-block animate-wiggle ml-2">👋</span>
            </h1>
            <p className="text-[#CFC89A]/50 mt-1">Continue your learning journey.</p>
          </div>
          <Link to="/courses" className="btn-primary py-2.5 px-5 text-sm">
            Browse courses
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
          </Link>
        </div>

        {/* Quote */}
        <div className="card mb-8 p-6 border-amber/10 bg-gradient-to-r from-amber/5 to-rust/5">
          <p className="text-lg font-display font-medium text-amber italic">"{quote.text}"</p>
          <p className="text-xs text-[#CFC89A]/40 mt-2">— {quote.author}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Enrolled', value: enrolled.length, icon: '📚', color: 'from-amber to-rust' },
            { label: 'Avg Progress', value: `${totalProgress}%`, icon: '📊', color: 'from-sage to-amber' },
            { label: 'Completed', value: completedLessons, icon: '✅', color: 'from-green-600 to-amber' },
            { label: 'Streak', value: `${streakDays}d`, icon: '🔥', color: 'from-rust to-amber' },
          ].map((s) => (
            <div key={s.label} className="card p-5 border-[#CFC89A]/5">
              <span className="text-2xl mb-2 block">{s.icon}</span>
              <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent tabular-nums`}>
                {s.value}
              </div>
              <div className="text-xs text-[#CFC89A]/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <h2 className="text-xl font-display font-bold text-[#CFC89A] mb-4">My courses</h2>
        {enrolled.length === 0 ? (
          <div className="card text-center py-12 mb-8">
            <p className="text-4xl mb-3">🧭</p>
            <p className="text-[#CFC89A]/50">You're not enrolled in any course yet.</p>
            <Link to="/courses" className="btn-primary mt-4 py-2.5 px-5 text-sm inline-flex">Explore courses</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {enrolled.map((e) => (
              <Link key={e.courseSlug} to={`/courses/${e.courseSlug}`} className="card-hover p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{e.course.flag}</span>
                  <span className="pill-amber text-xs">{e.level}</span>
                </div>
                <h3 className="font-display font-bold text-[#CFC89A]">{e.course.title}</h3>
                <p className="text-xs text-[#CFC89A]/40 mt-1">Learning in {e.instructionLanguage}</p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#CFC89A]/40">Progress</span>
                    <span className="text-amber font-medium">{e.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#CFC89A]/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber to-rust transition-all duration-700" style={{ width: `${e.progress}%` }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Explore More */}
        {unenrolled.length > 0 && (
          <>
            <h2 className="text-xl font-display font-bold text-[#CFC89A] mb-4">Explore more</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unenrolled.slice(0, 3).map((c) => (
                <Link key={c.slug} to={`/courses/${c.slug}`} className="card-hover flex items-center gap-4 p-4">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#CFC89A] truncate">{c.title}</p>
                    <p className="text-xs text-[#CFC89A]/40">{c.category}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="text-[#CFC89A]/20"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
