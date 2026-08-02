import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/admin/courses').then(({ data }) => setCourses(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>
              Teacher Dashboard
              <span className="inline-block ml-2">📚</span>
            </h1>
            <p className="mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Manage your courses and students.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/courses" className="povir-btn-secondary py-2 px-4 text-sm">View courses</Link>
            <Link to="/admin/courses/new" className="povir-btn-primary py-2 px-4 text-sm">New course</Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Courses', value: courses.length, icon: '📖', color: 'rgb(var(--color-primary))' },
            { label: 'Total Lessons', value: '—', icon: '📝', color: 'rgb(var(--color-text-secondary))' },
            { label: 'Enrolled Students', value: '—', icon: '👨‍🎓', color: 'rgb(var(--color-primary))' },
            { label: 'Pending Reviews', value: '—', icon: '📋', color: 'rgb(var(--color-text))' },
          ].map((s) => (
            <div key={s.label} className="povir-card p-5 text-center">
              <span className="text-2xl mb-2 block">{s.icon}</span>
              <div className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Course List */}
        <h2 className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--color-text))' }}>Your Courses</h2>
        {loading ? (
          <Spinner centered />
        ) : courses.length === 0 ? (
          <div className="povir-card text-center py-12">
            <p className="text-3xl mb-3">📭</p>
            <p style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>No courses yet.</p>
            <Link to="/admin/courses/new" className="povir-btn-primary mt-4 py-2.5 px-5 text-sm inline-flex">Create your first course</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div key={c.slug} className="povir-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="povir-chip-gold text-xs">{c.category}</span>
                </div>
                <h3 className="font-bold" style={{ color: 'rgb(var(--color-text))' }}>{c.title}</h3>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{c.description}</p>
                <div className="flex gap-2 mt-4">
                  <Link to={`/admin/courses/${c.slug}/lessons`} className="povir-btn-secondary py-1.5 px-3 text-xs flex-1 text-center">Lessons</Link>
                  <Link to={`/admin/courses/${c.slug}/quizzes`} className="povir-btn-secondary py-1.5 px-3 text-xs flex-1 text-center">Quizzes</Link>
                  <Link to={`/admin/courses/${c.slug}/edit`} className="povir-btn-ghost py-1.5 px-3 text-xs">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
