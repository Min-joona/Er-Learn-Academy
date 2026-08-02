import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import Spinner from '../../components/Spinner';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/api/admin/courses');
      setCourses(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, []);
  useEffect(() => {
    api.get('/api/admin/users').then(({ data }) => setUsers(data)).catch(() => {});
  }, []);

  const stats = useMemo(() => ({
    total: courses.length,
    free: courses.filter((c) => c.price === 0).length,
    paid: courses.filter((c) => c.price > 0).length,
    categories: [...new Set(courses.map((c) => c.category))].length,
  }), [courses]);

  const handleDelete = async (slug) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/api/admin/courses/${slug}`);
      setCourses((prev) => prev.filter((c) => c.slug !== slug));
    } catch (err) { alert('Failed to delete'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Admin Panel</h1>
            <p className="mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Manage your academy.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/analytics" className="povir-btn-secondary py-2 px-4 text-sm">Analytics</Link>
            <Link to="/admin/courses/new" className="povir-btn-primary py-2 px-4 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/></svg>
              New Course
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Courses', value: stats.total },
            { label: 'Free Courses', value: stats.free },
            { label: 'Paid Courses', value: stats.paid },
            { label: 'Categories', value: stats.categories },
          ].map((s) => (
            <div key={s.label} className="povir-card p-5 text-center">
              <div className="text-2xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-text))' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-6 border-b" style={{ borderColor: 'rgba(var(--color-border), 0.6)' }}>
          {[{ id: 'courses', label: 'Courses' }, { id: 'users', label: 'Users' }].map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="pb-3 text-sm font-medium transition-all"
              style={{
                color: activeTab === t.id ? 'rgb(var(--color-primary))' : 'rgba(var(--color-text-muted), 0.6)',
                borderBottom: activeTab === t.id ? '2px solid rgb(var(--color-primary))' : '2px solid transparent',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'courses' && (
          <div className="space-y-3">
            {loading ? (
              <Spinner centered />
            ) : courses.length === 0 ? (
              <div className="text-center py-12" style={{ color: 'rgb(var(--color-text-muted))' }}>No courses yet.</div>
            ) : (
              courses.map((course) => (
                <div key={course.slug} className="povir-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{course.flag}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate" style={{ color: 'rgb(var(--color-text))' }}>{course.title}</p>
                      <p className="text-xs truncate" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{course.category} · {course.levels?.join(', ') || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {[
                      { to: `/admin/courses/${course.slug}/lessons`, label: '📝' },
                      { to: `/admin/courses/${course.slug}/quizzes`, label: '❓' },
                      { to: `/admin/courses/${course.slug}/flashcards`, label: '🃏' },
                      { to: `/admin/courses/${course.slug}/exams`, label: '📋' },
                      { to: `/admin/courses/${course.slug}/typing-drills`, label: '⌨️' },
                      { to: `/admin/courses/${course.slug}/placement`, label: '🎯' },
                    ].map((link) => (
                      <Link key={link.to} to={link.to} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors hover:bg-[rgba(var(--color-text),0.05)]" title={link.label}>
                        {link.label}
                      </Link>
                    ))}
                    <Link to={`/admin/courses/${course.slug}/edit`} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors hover:bg-[rgba(var(--color-primary),0.1)]" title="Edit" style={{ color: 'rgb(var(--color-primary))' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69a15.86,15.86,0,0,0,11.31-4.69L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120Z"/></svg>
                    </Link>
                    <button onClick={() => handleDelete(course.slug)} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors hover:bg-[rgba(var(--color-destructive),0.1)]" title="Delete" style={{ color: 'rgb(var(--color-destructive))' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM192,208H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-3">
            {users.length === 0 ? (
              <div className="text-center py-12" style={{ color: 'rgb(var(--color-text-muted))' }}>No users found.</div>
            ) : (
              users.map((u) => (
                <div key={u._id} className="povir-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(var(--color-primary), 0.1)', color: 'rgb(var(--color-primary))' }}>
                      {u.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'rgb(var(--color-text))' }}>{u.name || 'Unknown'}</p>
                      <p className="text-xs" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                    u.role === 'admin' ? 'povir-chip-primary' : u.role === 'teacher' ? 'povir-chip-gold' : 'povir-chip-default'
                  }`}>{u.role}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
