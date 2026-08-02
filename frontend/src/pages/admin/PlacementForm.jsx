import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function PlacementForm() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';
  const [form, setForm] = useState({ questions: [{ question: '', options: ['', '', '', ''], correct: 0 }], courseSlug: slug });

  useEffect(() => {
    if (isEdit) api.get(`/api/admin/courses/${slug}/placement`).then(({ data }) => {
      const p = Array.isArray(data) ? data[0] : data;
      if (p) setForm(p);
    }).catch(() => toast.error('Failed to load'));
  }, [slug, id, isEdit]);

  const handleQuestionChange = (i, field, value) => {
    const qs = [...form.questions];
    qs[i] = { ...qs[i], [field]: value };
    setForm({ ...form, questions: qs });
  };

  const handleOptionChange = (qi, oi, value) => {
    const qs = [...form.questions];
    qs[qi].options[oi] = value;
    setForm({ ...form, questions: qs });
  };

  const addQuestion = () => setForm({ ...form, questions: [...form.questions, { question: '', options: ['', '', '', ''], correct: 0 }] });
  const removeQuestion = (i) => { if (form.questions.length > 1) setForm({ ...form, questions: form.questions.filter((_, idx) => idx !== i) }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) { await api.put(`/api/admin/placement/${id}`, form); toast.success('Updated'); }
      else { await api.post('/api/admin/placement', form); toast.success('Created'); }
      navigate(`/admin/courses/${slug}/placement`);
    } catch { toast.error('Failed to save'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{isEdit ? 'Edit' : 'New'} Placement Test</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/placement`} className="povir-btn-secondary py-2 px-4 text-sm">← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="povir-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--color-text))' }}>Questions ({form.questions.length})</h3>
              <button type="button" onClick={addQuestion} className="povir-btn-secondary py-1 px-3 text-xs">+ Add</button>
            </div>
            {form.questions.map((q, qi) => (
              <div key={qi} className="p-4 rounded-xl" style={{ background: 'rgba(var(--color-surface), 0.5)' }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold" style={{ color: 'rgb(var(--color-accent-gold))' }}>Q{qi + 1}</span>
                  {form.questions.length > 1 && (
                    <button type="button" onClick={() => removeQuestion(qi)} className="text-xs" style={{ color: 'rgb(var(--color-destructive))' }}>Remove</button>
                  )}
                </div>
                <textarea rows={2} className="povir-input mb-3" placeholder="Question text" value={q.question} onChange={(e) => handleQuestionChange(qi, 'question', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input type="radio" name={`correct-${qi}`} checked={q.correct === oi} onChange={() => handleQuestionChange(qi, 'correct', oi)} />
                      <input className="povir-input flex-1" placeholder={`Option ${oi + 1}`} value={opt} onChange={(e) => handleOptionChange(qi, oi, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className="povir-btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}
