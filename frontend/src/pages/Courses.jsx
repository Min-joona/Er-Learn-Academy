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
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Explore courses</h1>
          <p className="mt-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>Find your perfect learning path.</p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => {
            const isActive = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSearchParams(c.id === 'All' ? {} : { category: c.id })}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[rgb(var(--color-primary-text))]'
                    : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] border'
                }`}
                style={{
                  background: isActive ? 'rgb(var(--color-primary))' : 'transparent',
                  borderColor: isActive ? 'transparent' : 'rgba(var(--color-border), 0.6)',
                }}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid place-items-center py-20">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(var(--color-text-muted), 0.2)' }} />
              <div className="absolute inset-1 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: 'rgb(var(--color-primary))' }} />
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <p style={{ color: 'rgb(var(--color-text-muted))' }}>No courses in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c) => (
              <Link key={c.slug} to={`/courses/${c.slug}`} className="povir-card-interactive overflow-hidden group p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-card))] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{c.flag}</span>
                  <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm" style={{ background: 'rgba(var(--color-card), 0.8)', borderColor: 'rgba(var(--color-border), 0.6)', color: 'rgb(var(--color-text-secondary))' }}>
                    {c.price === 0 ? 'Free' : `$${c.price}`}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg transition-colors" style={{ color: 'rgb(var(--color-text))' }}>
                    {c.title} <span className="text-sm font-normal" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{c.titleTi}</span>
                  </h3>
                  <p className="text-sm mt-1 line-clamp-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(c.focus || []).slice(0, 3).map((f) => (
                      <span key={f} className="povir-chip-default text-[10px] px-2 py-1">{f}</span>
                    ))}
                    {(c.instructionLanguages || []).slice(0, 2).map((l) => (
                      <span key={l} className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'rgba(var(--color-text), 0.05)', color: 'rgba(var(--color-text-muted), 0.6)' }}>{l}</span>
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
