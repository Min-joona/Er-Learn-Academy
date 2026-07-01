import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

const cats = ['All', 'English', 'Computer', 'Language', 'Typing'];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [cat, setCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/content/courses?category=${cat}`).then(({ data }) => setCourses(data)).finally(() => setLoading(false));
  }, [cat]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold">All courses</h1>
      <p className="mt-1 text-ink/60">Choose what you want to master.</p>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`pill whitespace-nowrap border-2 px-4 py-2 ${cat === c ? 'border-teal bg-teal text-white' : 'border-ink/10 text-ink/60'}`}>{c}</button>
        ))}
      </div>

      {loading ? (
        <div className="grid place-items-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-teal" /></div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c.slug} to={`/courses/${c.slug}`} className="card group overflow-hidden p-0 transition hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden">
                <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-lg">{c.flag}</span>
                <span className="absolute right-3 top-3 pill bg-teal text-white">{c.price === 0 ? 'Free' : `$${c.price}`}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{c.title} <span className="text-sm font-normal text-ink/40">{c.titleTi}</span></h3>
                <p className="mt-1 text-sm text-ink/60 line-clamp-2">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {c.focus.map((f) => <span key={f} className="pill bg-teal/10 text-teal">{f}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
