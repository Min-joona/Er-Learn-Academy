import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function LessonManager() {
  const { slug } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const emptyForm = { title: '', level: 'Beginner', type: 'Reading', order: 1, body: '', practiceTask: '', listenText: '', videoId: '' };
  const [form, setForm] = useState(emptyForm);

  const fetchLessons = async () => {
    try { const { data } = await api.get(`/api/admin/courses/${slug}/lessons`); setLessons(data); } catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchLessons(); }, [slug]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, courseSlug: slug, order: Number(form.order) };
    try {
      if (editingId) await api.put(`/api/admin/lessons/${editingId}`, payload);
      else await api.post('/api/admin/lessons', payload);
      setForm(emptyForm);
      setEditingId(null);
      fetchLessons();
      toast.success(editingId ? 'Lesson updated!' : 'Lesson added!');
    } catch (err) { toast.error('Failed to save lesson'); }
  };

  const handleEdit = (lesson) => { setEditingId(lesson._id); setForm(lesson); window.scrollTo(0, 0); };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lesson?')) return;
    try { await api.delete(`/api/admin/lessons/${id}`); setLessons((l) => l.filter((x) => x._id !== id)); toast.success('Deleted'); } catch { toast.error('Failed'); }
  };

  const typeIcon = { Reading: '📖', Listening: '🎧', Practice: '✏️' };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-5">
        <Link to="/admin/courses" className="inline-flex items-center gap-2 text-sm text-[#ECE5CE]/50 hover:text-amber mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
          Back to Courses
        </Link>

        <h1 className="text-2xl font-display font-bold text-[#ECE5CE] mb-8">Lessons: <span className="text-amber">{slug}</span></h1>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* Form */}
          <div className="card p-5 lg:sticky lg:top-24 self-start">
            <h2 className="font-semibold text-[#ECE5CE] mb-4">{editingId ? 'Edit Lesson' : 'Add Lesson'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Title</label>
                <input name="title" value={form.title} onChange={handleChange} required className="input text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Level</label>
                  <select name="level" value={form.level} onChange={handleChange} className="input text-sm">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="input text-sm">
                    <option>Reading</option><option>Listening</option><option>Practice</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Order</label>
                <input type="number" name="order" value={form.order} onChange={handleChange} required className="input text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Content Body</label>
                <textarea name="body" rows={5} value={form.body} onChange={handleChange} required className="input text-sm font-mono" />
              </div>
              {form.type === 'Practice' && (
                <div>
                  <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Practice Task</label>
                  <textarea name="practiceTask" rows={2} value={form.practiceTask} onChange={handleChange} className="input text-sm" />
                </div>
              )}
              {form.type === 'Listening' && (
                <div>
                  <label className="text-xs font-medium text-[#ECE5CE]/50 mb-1 block">Listen Text</label>
                  <textarea name="listenText" rows={2} value={form.listenText} onChange={handleChange} className="input text-sm" />
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary py-2 px-5 text-sm flex-1">
                  {editingId ? 'Update' : 'Add'} Lesson
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="btn-ghost py-2 px-4 text-sm">Cancel</button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-12"><div className="relative w-8 h-8 mx-auto"><div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" /><div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" /></div></div>
            ) : lessons.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-2xl mb-2">📭</p>
                <p className="text-[#ECE5CE]/30 text-sm">No lessons yet.</p>
              </div>
            ) : (
              lessons.map((l) => (
                <div key={l._id} className="card-hover p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-8">{typeIcon[l.type] || '📄'}</span>
                    <div>
                      <p className="font-medium text-sm text-[#ECE5CE]">{l.title}</p>
                      <div className="flex gap-1.5 mt-0.5">
                        <span className="pill text-[10px] bg-[#ECE5CE]/5 text-[#ECE5CE]/40">#{l.order}</span>
                        <span className="pill text-[10px] bg-amber/10 text-amber">{l.level}</span>
                        <span className="pill text-[10px] bg-sage/10 text-sage">{l.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(l)} className="p-1.5 rounded-lg text-[#ECE5CE]/30 hover:text-amber hover:bg-amber/10 transition-all" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.32,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.31,64l24-24L216,84.69Z"></path></svg>
                    </button>
                    <button onClick={() => handleDelete(l._id)} className="p-1.5 rounded-lg text-[#ECE5CE]/30 hover:text-rust hover:bg-rust/10 transition-all" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
