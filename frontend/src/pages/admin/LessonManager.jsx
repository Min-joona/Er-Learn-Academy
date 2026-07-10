import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import { ArrowLeft, Save, Trash2, Edit } from 'lucide-react';

export default function LessonManager() {
  const { slug } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = { title: '', level: 'Beginner', type: 'Reading', order: 1, body: '', practiceTask: '', listenText: '', videoId: '' };
  const [formData, setFormData] = useState(emptyForm);

  const fetchLessons = async () => {
    try {
      const { data } = await api.get(`/api/admin/courses/${slug}/lessons`);
      setLessons(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchLessons(); }, [slug]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, courseSlug: slug };
    try {
      if (editingId) {
        await api.put(`/api/admin/lessons/${editingId}`, payload);
      } else {
        await api.post('/api/admin/lessons', payload);
      }
      setFormData(emptyForm);
      setEditingId(null);
      fetchLessons();
    } catch (err) { alert('Failed to save lesson'); }
  };

  const handleEdit = (lesson) => {
    setEditingId(lesson._id);
    setFormData(lesson);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lesson?')) return;
    try {
      await api.delete(`/api/admin/lessons/${id}`);
      setLessons(lessons.filter(l => l._id !== id));
    } catch (err) { alert('Failed to delete'); }
  };

  if (loading) return <div className="p-10 text-center">Loading Lessons...</div>;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link to="/admin/courses" className="inline-flex items-center gap-2 text-ink/60 hover:text-teal mb-6 font-semibold">
        <ArrowLeft size={18} /> Back to Courses
      </Link>
      
      <h1 className="text-3xl font-display font-extrabold text-ink mb-8">Manage Lessons ({slug})</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10 flex flex-col gap-4 sticky top-24">
            <h2 className="font-bold text-lg">{editingId ? 'Edit Lesson' : 'Add New Lesson'}</h2>
            
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              Title <input required name="title" value={formData.title} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
                Level 
                <select name="level" value={formData.level} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
                Type 
                <select name="type" value={formData.type} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal">
                  <option>Reading</option><option>Listening</option><option>Practice</option>
                </select>
              </label>
            </div>
            
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              Order (Number) <input type="number" required name="order" value={formData.order} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
            </label>
            
            <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
              Content Body (Markdown) <textarea required name="body" rows={4} value={formData.body} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
            </label>

            {formData.type === 'Practice' && (
              <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
                Practice Task <textarea name="practiceTask" rows={2} value={formData.practiceTask} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
              </label>
            )}

            {formData.type === 'Listening' && (
              <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
                Listen Text <textarea name="listenText" rows={2} value={formData.listenText} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
              </label>
            )}

            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn-primary flex-1 py-2 flex justify-center items-center gap-2">
                <Save size={16} /> {editingId ? 'Save' : 'Add'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData(emptyForm); }} className="px-4 bg-ink/10 rounded-lg text-sm font-bold hover:bg-ink/20">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-ink/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ink/5 border-b border-ink/10">
                  <th className="p-4 font-semibold text-ink/70">Order</th>
                  <th className="p-4 font-semibold text-ink/70">Level / Type</th>
                  <th className="p-4 font-semibold text-ink/70">Title</th>
                  <th className="p-4 font-semibold text-ink/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson._id} className="border-b border-ink/5 last:border-0 hover:bg-sand/30">
                    <td className="p-4 font-bold">{lesson.order}</td>
                    <td className="p-4 text-sm">
                      <span className="bg-ink/10 px-2 py-1 rounded mr-2">{lesson.level}</span>
                      <span className="text-teal font-semibold">{lesson.type}</span>
                    </td>
                    <td className="p-4 font-medium">{lesson.title}</td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(lesson)} className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(lesson._id)} className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {lessons.length === 0 && (
                  <tr><td colSpan="4" className="p-8 text-center text-ink/50">No lessons created yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
