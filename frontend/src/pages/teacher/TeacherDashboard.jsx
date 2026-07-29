import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';

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
            <h1 className="text-3xl font-display font-bold text-[#ECE5CE]">
              Teacher Dashboard
              <span className="inline-block ml-2">📚</span>
            </h1>
            <p className="text-[#ECE5CE]/50 mt-1">Manage your courses and students.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/courses" className="btn-outline py-2 px-4 text-sm">View courses</Link>
            <Link to="/admin/courses/new" className="btn-primary py-2 px-4 text-sm">New course</Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Courses', value: courses.length, icon: '📖', color: 'text-amber' },
            { label: 'Total Lessons', value: '—', icon: '📝', color: 'text-sage' },
            { label: 'Enrolled Students', value: '—', icon: '👨‍🎓', color: 'text-amber' },
            { label: 'Pending Reviews', value: '—', icon: '📋', color: 'text-[#ECE5CE]' },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <span className="text-2xl mb-2 block">{s.icon}</span>
              <div className={`text-2xl font-bold ${s.color} tabular-nums`}>{s.value}</div>
              <div className="text-xs text-[#ECE5CE]/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Course List */}
        <h2 className="text-xl font-display font-bold text-[#ECE5CE] mb-4">Your Courses</h2>
        {loading ? (
          <div className="text-center py-12"><div className="relative w-8 h-8 mx-auto"><div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" /><div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" /></div></div>
        ) : courses.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-3xl mb-3">📭</p>
            <p className="text-[#ECE5CE]/50">No courses yet.</p>
            <Link to="/admin/courses/new" className="btn-primary mt-4 py-2.5 px-5 text-sm inline-flex">Create your first course</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div key={c.slug} className="card-hover p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="pill-amber text-xs">{c.category}</span>
                </div>
                <h3 className="font-display font-bold text-[#ECE5CE]">{c.title}</h3>
                <p className="text-xs text-[#ECE5CE]/40 mt-1 line-clamp-2">{c.description}</p>
                <div className="flex gap-2 mt-4">
                  <Link to={`/admin/courses/${c.slug}/lessons`} className="btn-outline py-1.5 px-3 text-xs flex-1 text-center">Lessons</Link>
                  <Link to={`/admin/courses/${c.slug}/quizzes`} className="btn-outline py-1.5 px-3 text-xs flex-1 text-center">Quizzes</Link>
                  <Link to={`/admin/courses/${c.slug}/edit`} className="btn-ghost py-1.5 px-3 text-xs">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
