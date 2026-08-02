import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function ExamForm() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';
  const [form, setForm] = useState({ title: '', level: 1, passingScore: 70, questions: [{ question: '', options: ['', '', '', ''], correct: 0 }], courseSlug: slug });

  useEffect(() => {
    if (isEdit) api.get(`/api/admin/courses/${slug}/exams`).then(({ data }) => {
      const ex = data.find((e) => e._id === id);
      if (ex) setForm(ex);
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
    if (!form.title) return toast.error('Title is required');
    try {
      if (isEdit) { await api.put(`/api/admin/exams/${id}`, form); toast.success('Updated'); }
      else { await api.post('/api/admin/exams', form); toast.success('Created'); }
      navigate(`/admin/courses/${slug}/exams`);
    } catch { toast.error('Failed to save'); }
  };

  const input = 'povir-input';

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{isEdit ? 'Edit' : 'New'} Exam</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/exams`} className="povir-btn-secondary py-2 px-4 text-sm">← Back</Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="povir-card p-6 space-y-4">
            <div>
              <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Title</label>
              <input className={input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Level</label>
                <input type="number" min={1} className={input} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} />
              </div>
              <div className="flex-1">
                <label className="text-xs mb-1 block" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Passing Score (%)</label>
                <input type="number" min={0} max={100} className={input} value={form.passingScore} onChange={(e) => setForm({ ...form, passingScore: Number(e.target.value) })} />
              </div>
            </div>
          </div>
          <div className="povir-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: 'rgb(var(--color-text))' }}>Questions ({form.questions.length})</h3>
              <button type="button" onClick={addQuestion} className="povir-btn-secondary py-1 px-3 text-xs">+ Add</button>
            </div>
            {form.questions.map((q, qi) => (
              <div key={qi} style={{ border: '1px solid rgba(var(--color-text-muted), 0.1)' }} className="rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <input className={`${input} flex-1`} placeholder={`Question ${qi + 1}`} value={q.question} onChange={(e) => handleQuestionChange(qi, 'question', e.target.value)} />
                  <button type="button" onClick={() => removeQuestion(qi)} className="povir-btn-secondary py-1 px-2 text-xs shrink-0" style={{ color: 'rgba(239, 68, 68, 0.7)' }}>×</button>
                </div>
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input type="radio" name={`correct-${qi}`} checked={q.correct === oi} onChange={() => handleQuestionChange(qi, 'correct', oi)} style={{ accentColor: 'rgb(var(--color-accent-gold))' }} />
                    <input className={`${input} flex-1`} placeholder={`Option ${oi + 1}`} value={opt} onChange={(e) => handleOptionChange(qi, oi, e.target.value)} />
                    <span className="text-[10px] w-12 text-right" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>{q.correct === oi ? '✓ correct' : ''}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button type="submit" className="povir-btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}
