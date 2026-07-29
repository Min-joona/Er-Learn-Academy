import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';

const categories = [
  { id: 'All', label: 'All', icon: '📋' },
  { id: 'English', label: 'English', icon: '🌍' },
  { id: 'Computer', label: 'Computer', icon: '💻' },
  { id: 'Language', label: 'Languages', icon: '🗣️' },
  { id: 'Typing', label: 'Typing', icon: '⌨️' },
];

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const cat = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);
    api.get(`/api/content/courses?category=${cat}`).then(({ data }) => setCourses(data)).catch(() => {}).finally(() => setLoading(false));
  }, [cat]);

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-10">
          <h1 className="section-title text-4xl md:text-5xl">Explore courses</h1>
          <p className="section-sub mx-auto">Find your perfect learning path.</p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSearchParams(c.id === 'All' ? {} : { category: c.id })}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                cat === c.id ? 'bg-amber text-white shadow-lg shadow-amber/20' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground border border-foreground/10'
              }`}
            >
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid place-items-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" />
              <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" />
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-foreground/50">No courses in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c) => (
              <Link key={c.slug} to={`/courses/${c.slug}`} className="card-hover group overflow-hidden p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{c.flag}</span>
                  <span className="absolute top-3 right-3 pill-amber text-xs">{c.price === 0 ? 'Free' : `$${c.price}`}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-amber transition-colors">
                    {c.title} <span className="text-sm font-normal text-foreground/30">{c.titleTi}</span>
                  </h3>
                  <p className="text-sm text-foreground/50 mt-1 line-clamp-2">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(c.focus || []).slice(0, 3).map((f) => (
                      <span key={f} className="pill bg-amber/10 text-amber text-[10px]">{f}</span>
                    ))}
                    {(c.instructionLanguages || []).slice(0, 2).map((l) => (
                      <span key={l} className="pill bg-foreground/10 text-foreground/40 text-[10px]">{l}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
