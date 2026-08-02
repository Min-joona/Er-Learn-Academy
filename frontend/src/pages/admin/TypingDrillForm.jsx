import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function TypingDrillForm() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';
  const [form, setForm] = useState({ title: '', text: '', level: 1, category: 'General', courseSlug: slug });

  useEffect(() => {
    if (isEdit) api.get(`/api/admin/courses/${slug}/typing-drills`).then(({ data }) => {
      const drill = data.find((d) => d._id === id);
      if (drill) setForm(drill);
    }).catch(() => toast.error('Failed to load'));
  }, [slug, id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.text) return toast.error('Title and text are required');
    try {
      if (isEdit) { await api.put(`/api/admin/typing-drills/${id}`, form); toast.success('Updated'); }
      else { await api.post('/api/admin/typing-drills', form); toast.success('Created'); }
      navigate(`/admin/courses/${slug}/typing-drills`);
    } catch { toast.error('Failed to save'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{isEdit ? 'Edit' : 'New'} Typing Drill</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/typing-drills`} className="povir-btn-secondary py-2 px-4 text-sm">← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className="povir-card p-6 space-y-4">
          <div>
            <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Title</label>
            <input className="povir-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Category</label>
            <select className="povir-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>General</option>
              <option>Home Row</option>
              <option>Top Row</option>
              <option>Bottom Row</option>
              <option>Numbers</option>
              <option>Capitals</option>
              <option>Speed</option>
            </select>
          </div>
          <div>
            <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Level</label>
            <input type="number" min={1} className="povir-input" value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Text (what the user will type)</label>
            <textarea rows={6} className="povir-input font-mono text-sm leading-relaxed" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Paste or type the drill text here..." />
          </div>
          <button type="submit" className="povir-btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}
