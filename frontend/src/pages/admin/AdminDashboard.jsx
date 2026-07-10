import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Plus, Edit, Trash2, List } from 'lucide-react';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/api/admin/courses');
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/api/admin/courses/${slug}`);
      setCourses(courses.filter(c => c.slug !== slug));
    } catch (err) {
      console.error(err);
      alert('Failed to delete course');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-ink">Admin Dashboard</h1>
        <Link to="/admin/courses/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Course
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-ink/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-ink/5 border-b border-ink/10">
              <th className="p-4 font-semibold text-ink/70">Course</th>
              <th className="p-4 font-semibold text-ink/70">Category</th>
              <th className="p-4 font-semibold text-ink/70">Price</th>
              <th className="p-4 font-semibold text-ink/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-b border-ink/5 last:border-0 hover:bg-sand/30">
                <td className="p-4">
                  <div className="font-bold flex items-center gap-2">
                    <span className="text-2xl">{course.flag}</span>
                    {course.title}
                  </div>
                  <div className="text-sm text-ink/60">{course.slug}</div>
                </td>
                <td className="p-4">{course.category}</td>
                <td className="p-4">${course.price}</td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <Link to={`/admin/courses/${course.slug}/lessons`} className="p-2 text-teal bg-teal/10 rounded-lg hover:bg-teal/20" title="Manage Lessons">
                    <List size={18} />
                  </Link>
                  <Link to={`/admin/courses/${course.slug}/edit`} className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200" title="Edit Course">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(course.slug)} className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200" title="Delete Course">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan="4" className="p-8 text-center text-ink/50">No courses found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
