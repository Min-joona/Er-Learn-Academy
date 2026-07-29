import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';

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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-[#ECE5CE]">Admin Panel</h1>
            <p className="text-[#ECE5CE]/50 mt-1">Manage your academy.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/analytics" className="btn-outline py-2 px-4 text-sm">Analytics</Link>
            <Link to="/admin/courses/new" className="btn-primary py-2 px-4 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
              New Course
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Courses', value: stats.total, color: 'text-amber' },
            { label: 'Free Courses', value: stats.free, color: 'text-sage' },
            { label: 'Paid Courses', value: stats.paid, color: 'text-amber' },
            { label: 'Categories', value: stats.categories, color: 'text-[#ECE5CE]' },
          ].map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <div className={`text-2xl font-bold ${s.color} tabular-nums`}>{s.value}</div>
              <div className="text-xs text-[#ECE5CE]/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#ECE5CE]/10 mb-6">
          {[
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'users', label: 'Users', icon: '👥' },
          ].map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === t.id ? 'text-amber border-amber' : 'text-[#ECE5CE]/40 border-transparent hover:text-[#ECE5CE]/70'}`}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Courses Table */}
        {activeTab === 'courses' && (
          <div className="rounded-2xl border border-[#ECE5CE]/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#ECE5CE]/5 border-b border-[#ECE5CE]/10">
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider">Course</th>
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider hidden sm:table-cell">Price</th>
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id} className="border-b border-[#ECE5CE]/5 hover:bg-[#ECE5CE]/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{course.flag}</span>
                          <div>
                            <p className="font-semibold text-[#ECE5CE] text-sm">{course.title}</p>
                            <p className="text-xs text-[#ECE5CE]/30">{course.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-[#ECE5CE]/50 hidden md:table-cell">
                        <span className="pill bg-[#ECE5CE]/5 text-[#ECE5CE]/50 text-[10px]">{course.category}</span>
                      </td>
                      <td className="p-4 text-sm text-[#ECE5CE]/60 hidden sm:table-cell">${course.price}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <Link to={`/admin/courses/${course.slug}/lessons`} className="p-2 rounded-lg bg-amber/10 text-amber hover:bg-amber/20 transition-colors" title="Lessons">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM96,152H80a8,8,0,0,1,0-16H96a8,8,0,0,1,0,16Zm0-32H80a8,8,0,0,1,0-16H96a8,8,0,0,1,0,16Zm48,32H112a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16Zm0-32H112a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16Zm56,32H160a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm0-32H160a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Z"></path></svg>
                          </Link>
                          <Link to={`/admin/courses/${course.slug}/quizzes`} className="p-2 rounded-lg bg-sage/10 text-sage hover:bg-sage/20 transition-colors" title="Quizzes">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M236,80a8,8,0,0,1-8,8H216v32a8,8,0,0,1-16,0V88H168a8,8,0,0,1,0-16h32V40a8,8,0,0,1,16,0V72h32A8,8,0,0,1,236,80ZM92,172H44a8,8,0,0,0,0,16H92a8,8,0,0,0,0-16Zm60,0H116a8,8,0,0,0,0,16h36a8,8,0,0,0,0-16ZM92,140H44a8,8,0,0,0,0,16H92a8,8,0,0,0,0-16Zm60,0H116a8,8,0,0,0,0,16h36a8,8,0,0,0,0-16ZM92,108H44a8,8,0,0,0,0,16H92a8,8,0,0,0,0-16Zm60,0H116a8,8,0,0,0,0,16h36a8,8,0,0,0,0-16Zm40-24a8,8,0,0,0,8-8V60h16a8,8,0,0,0,0-16H200V28a8,8,0,0,0-16,0V44H168a8,8,0,0,0,0,16h16V76A8,8,0,0,0,192,84Zm32,28v96a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40h96a8,8,0,0,1,0,16H48V208H208V112a8,8,0,0,1,16,0Z"></path></svg>
                          </Link>
                          <Link to={`/admin/courses/${course.slug}/flashcards`} className="p-2 rounded-lg bg-amber/5 text-amber/70 hover:bg-amber/20 transition-colors" title="Flashcards">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M200,24H72A40,40,0,0,0,32,64V208a24,24,0,0,0,24,24H184a24,24,0,0,0,24-24V64A40,40,0,0,0,200,24ZM56,72H80a8,8,0,0,1,0,16H56V72Zm0,32H80a8,8,0,0,1,0,16H56V104ZM184,208H56a8,8,0,0,1-8-8V168H184v40Zm0-56H48V64A24,24,0,0,1,72,40H200a24,24,0,0,1,24,24V88H168a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8h56v48A8,8,0,0,1,184,152Zm8-32H176V104h16v16Z"></path></svg>
                          </Link>
                          <Link to={`/admin/courses/${course.slug}/exams`} className="p-2 rounded-lg bg-rust/10 text-rust hover:bg-rust/20 transition-colors" title="Exams">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM88,144a8,8,0,0,0,0,16h80a8,8,0,0,0,0-16Zm0-64h80a8,8,0,0,1,0,16H88a8,8,0,0,1,0-16Z"></path></svg>
                          </Link>
                          <Link to={`/admin/courses/${course.slug}/typing-drills`} className="p-2 rounded-lg bg-sage/10 text-sage hover:bg-sage/20 transition-colors" title="Typing Drills">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V192a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,160H48V48H208V192ZM56,120a8,8,0,0,1,8-8H72V96a8,8,0,0,1,16,0v16h8a8,8,0,0,1,0,16H88v16a8,8,0,0,1-16,0V128H64A8,8,0,0,1,56,120Zm112,0a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h16a8,8,0,0,1,8,8Zm40-16a8,8,0,0,1-8,8H184v16a8,8,0,0,1-16,0V112H160a8,8,0,0,1,0-16h16V80a8,8,0,0,1,16,0v16h16A8,8,0,0,1,208,104Z"></path></svg>
                          </Link>
                          <Link to={`/admin/courses/${course.slug}/placement`} className="p-2 rounded-lg bg-amber/5 text-amber/70 hover:bg-amber/20 transition-colors" title="Placement">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-56v-48a8,8,0,0,1,16,0v48a8,8,0,0,1-16,0Zm8-72a12,12,0,1,1,12-12A12,12,0,0,1,128,88Z"></path></svg>
                          </Link>
                          <Link to={`/admin/courses/${course.slug}/edit`} className="p-2 rounded-lg bg-amber/10 text-amber hover:bg-amber/20 transition-colors" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.32,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.31,64l24-24L216,84.69Z"></path></svg>
                          </Link>
                          <button onClick={() => handleDelete(course.slug)} className="p-2 rounded-lg bg-rust/10 text-rust hover:bg-rust/20 transition-colors" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {courses.length === 0 && !loading && (
              <div className="text-center py-12 text-[#ECE5CE]/30">
                <p className="text-3xl mb-2">📭</p>
                <p>No courses yet. Create your first one.</p>
              </div>
            )}
            {loading && (
              <div className="text-center py-12">
                <div className="relative w-8 h-8 mx-auto"><div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" /><div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" /></div>
              </div>
            )}
          </div>
        )}

        {/* Users tab */}
        {activeTab === 'users' && (
          <div className="rounded-2xl border border-[#ECE5CE]/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#ECE5CE]/5 border-b border-[#ECE5CE]/10">
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider">Name</th>
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider">Role</th>
                    <th className="p-4 text-xs font-semibold text-[#ECE5CE]/40 uppercase tracking-wider hidden md:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b border-[#ECE5CE]/5 hover:bg-[#ECE5CE]/[0.02] transition-colors">
                      <td className="p-4 text-sm text-[#ECE5CE]">{u.name}</td>
                      <td className="p-4 text-sm text-[#ECE5CE]/50 hidden sm:table-cell">{u.email}</td>
                      <td className="p-4">
                        <span className={`pill text-[10px] ${u.role === 'admin' ? 'bg-amber/10 text-amber' : u.role === 'teacher' ? 'bg-sage/10 text-sage' : 'bg-[#ECE5CE]/5 text-[#ECE5CE]/50'}`}>{u.role}</span>
                      </td>
                      <td className="p-4 text-xs text-[#ECE5CE]/30 hidden md:table-cell">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.length === 0 && (
              <div className="text-center py-12 text-[#ECE5CE]/30">
                <p className="text-3xl mb-2">👥</p>
                <p>No users yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
