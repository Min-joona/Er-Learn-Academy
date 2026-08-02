import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import BackLink from '../../components/BackLink';

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
        <BackLink to="/admin/courses" label="Back to Courses" />

        <h1 className="text-2xl font-bold mb-8" style={{ color: 'rgb(var(--color-text))' }}>Lessons: <span style={{ color: 'rgb(var(--color-primary))' }}>{slug}</span></h1>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          <div className="povir-card p-5 lg:sticky lg:top-24 self-start">
            <h2 className="font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>{editingId ? 'Edit Lesson' : 'Add Lesson'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required className="povir-input text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Level</label>
                  <select name="level" value={form.level} onChange={handleChange} className="povir-input text-sm">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="povir-input text-sm">
                    <option>Reading</option><option>Listening</option><option>Practice</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Order</label>
                <input type="number" name="order" value={form.order} onChange={handleChange} required className="povir-input text-sm" />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Content Body</label>
                <textarea name="body" rows={5} value={form.body} onChange={handleChange} required className="povir-input text-sm font-mono" />
              </div>
              {form.type === 'Practice' && (
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Practice Task</label>
                  <textarea name="practiceTask" rows={2} value={form.practiceTask} onChange={handleChange} className="povir-input text-sm" />
                </div>
              )}
              {form.type === 'Listening' && (
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Listen Text</label>
                  <textarea name="listenText" rows={2} value={form.listenText} onChange={handleChange} className="povir-input text-sm" />
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="povir-btn-primary py-2 px-5 text-sm flex-1">
                  {editingId ? 'Update' : 'Add'} Lesson
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="povir-btn-secondary py-2 px-4 text-sm">Cancel</button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {loading ? (
              <Spinner centered />
            ) : lessons.length === 0 ? (
              <div className="povir-card text-center py-12">
                <p className="text-2xl mb-2">📭</p>
                <p className="text-sm" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>No lessons yet.</p>
              </div>
            ) : (
              lessons.map((l) => (
                <div key={l._id} className="povir-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-8">{typeIcon[l.type] || '📄'}</span>
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'rgb(var(--color-text))' }}>{l.title}</p>
                      <div className="flex gap-1.5 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ color: 'rgba(var(--color-text-muted), 0.5)', background: 'rgba(var(--color-text-muted), 0.05)' }}>#{l.order}</span>
                        <span className="povir-chip-gold text-[10px]">{l.level}</span>
                        <span className="povir-chip-default text-[10px]">{l.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(l)} className="p-1.5 rounded-lg transition-all" title="Edit" style={{ color: 'rgba(var(--color-text-muted), 0.3)', background: 'transparent' }} onMouseEnter={(e) => { e.target.style.color = 'rgb(var(--color-primary))'; e.target.style.background = 'rgba(var(--color-primary), 0.1)'; }} onMouseLeave={(e) => { e.target.style.color = 'rgba(var(--color-text-muted), 0.3)'; e.target.style.background = 'transparent'; }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.32,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.31,64l24-24L216,84.69Z"></path></svg>
                    </button>
                    <button onClick={() => handleDelete(l._id)} className="p-1.5 rounded-lg transition-all" title="Delete" style={{ color: 'rgba(var(--color-text-muted), 0.3)', background: 'transparent' }} onMouseEnter={(e) => { e.target.style.color = 'rgb(var(--color-destructive))'; e.target.style.background = 'rgba(var(--color-destructive), 0.1)'; }} onMouseLeave={(e) => { e.target.style.color = 'rgba(var(--color-text-muted), 0.3)'; e.target.style.background = 'transparent'; }}>
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
