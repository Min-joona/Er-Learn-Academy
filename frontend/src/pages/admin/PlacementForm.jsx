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

  const label = 'text-xs text-foreground/60 mb-1 block';
  const input = 'w-full bg-base border border-foreground/10 rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:border-amber/40 transition-colors';

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{isEdit ? 'Edit' : 'New'} Placement Test</h1>
            <p className="text-foreground/40 text-sm mt-1">{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/placement`} className="btn-outline py-2 px-4 text-sm">← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Questions ({form.questions.length})</h3>
              <button type="button" onClick={addQuestion} className="btn-outline py-1 px-3 text-xs">+ Add</button>
            </div>
            {form.questions.map((q, qi) => (
              <div key={qi} className="border border-foreground/10 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <input className={`${input} flex-1`} placeholder={`Question ${qi + 1}`} value={q.question} onChange={(e) => handleQuestionChange(qi, 'question', e.target.value)} />
                  <button type="button" onClick={() => removeQuestion(qi)} className="btn-outline py-1 px-2 text-xs text-red-400/70 shrink-0">×</button>
                </div>
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input type="radio" name={`correct-${qi}`} checked={q.correct === oi} onChange={() => handleQuestionChange(qi, 'correct', oi)} className="accent-amber" />
                    <input className={`${input} flex-1`} placeholder={`Option ${oi + 1}`} value={opt} onChange={(e) => handleOptionChange(qi, oi, e.target.value)} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button type="submit" className="btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}
