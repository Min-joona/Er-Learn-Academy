import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function FlashcardForm() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';
  const [form, setForm] = useState({ front: '', back: '', level: 1, courseSlug: slug });

  useEffect(() => {
    if (isEdit) api.get(`/api/admin/courses/${slug}/flashcards`).then(({ data }) => {
      const card = data.find((c) => c._id === id);
      if (card) setForm(card);
    }).catch(() => toast.error('Failed to load'));
  }, [slug, id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.front || !form.back) return toast.error('Front and back are required');
    try {
      if (isEdit) { await api.put(`/api/admin/flashcards/${id}`, form); toast.success('Updated'); }
      else { await api.post('/api/admin/flashcards', form); toast.success('Created'); }
      navigate(`/admin/courses/${slug}/flashcards`);
    } catch { toast.error('Failed to save'); }
  };

  const label = 'text-xs text-foreground/60 mb-1 block';
  const input = 'w-full bg-base border border-foreground/10 rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-amber/40 transition-colors';

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-2xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{isEdit ? 'Edit' : 'New'} Flashcard</h1>
            <p className="text-foreground/40 text-sm mt-1">{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/flashcards`} className="btn-outline py-2 px-4 text-sm">← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className={label}>Front (question)</label>
            <textarea rows={2} className={input} value={form.front} onChange={(e) => setForm({ ...form, front: e.target.value })} />
          </div>
          <div>
            <label className={label}>Back (answer)</label>
            <textarea rows={2} className={input} value={form.back} onChange={(e) => setForm({ ...form, back: e.target.value })} />
          </div>
          <div>
            <label className={label}>Level</label>
            <input type="number" min={1} className={input} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} />
          </div>
          <button type="submit" className="btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}
