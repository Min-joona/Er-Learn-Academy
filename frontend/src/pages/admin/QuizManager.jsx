import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function QuizManager() {
  const { slug } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const emptyForm = { title: '', level: 'Beginner', questions: '' };
  const [form, setForm] = useState(emptyForm);

  const fetchQuizzes = async () => {
    try {
      const { data } = await api.get(`/api/content/courses/${slug}`);
      setQuizzes(data.quizzes || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchQuizzes(); }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questions = form.questions.split('\n').filter(Boolean).map((line) => {
        const [prompt, ...rest] = line.split('|');
        const options = rest.slice(0, -1).map((o) => o.trim());
        const answer = parseInt(rest[rest.length - 1]) || 0;
        return { prompt: prompt.trim(), options, answer };
      });
      const payload = { courseSlug: slug, title: form.title, level: form.level, questions };

      if (editingId) {
        await api.put(`/api/admin/quizzes/${editingId}`, payload);
      } else {
        await api.post('/api/admin/quizzes', payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchQuizzes();
      toast.success('Quiz saved!');
    } catch (err) { toast.error('Failed to save quiz'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-5">
        <Link to="/admin/courses" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-amber mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
          Back
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Quizzes: <span className="text-amber">{slug}</span></h1>

        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          <div className="card p-5 lg:sticky lg:top-24 self-start">
            <h2 className="font-semibold text-foreground mb-4">{editingId ? 'Edit Quiz' : 'New Quiz'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground/50 mb-1 block">Title</label>
                <input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="input text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/50 mb-1 block">Level</label>
                <select name="level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="input text-sm">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/50 mb-1 block">Questions (one per line: Question|Opt1|Opt2|Opt3|AnswerIndex)</label>
                <textarea name="questions" rows={8} value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} required className="input text-sm font-mono" placeholder="What is 2+2?|3|4|5|1" />
              </div>
              <button type="submit" className="btn-primary w-full py-2.5 text-sm">{editingId ? 'Update' : 'Add'} Quiz</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="btn-ghost w-full py-2 text-sm">Cancel</button>}
            </form>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-12"><div className="relative w-8 h-8 mx-auto animate-spin"><div className="absolute inset-0 rounded-full border-2 border-amber/20" /><div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber" /></div></div>
            ) : quizzes.length === 0 ? (
              <div className="card text-center py-12"><p className="text-2xl mb-2">📭</p><p className="text-foreground/30 text-sm">No quizzes yet.</p></div>
            ) : (
              quizzes.map((q) => (
                <div key={q._id} className="card p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-foreground">{q.title}</p>
                    <p className="text-xs text-foreground/40">{q.questions?.length || 0} questions · {q.level}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingId(q._id); setForm({ title: q.title, level: q.level, questions: q.questions.map((qq) => `${qq.prompt}|${qq.options.join('|')}|${qq.answer}`).join('\n') }); }} className="p-1.5 rounded-lg text-foreground/30 hover:text-amber hover:bg-amber/10 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.32,96a16,16,0,0,0,0-22.63Z"></path></svg>
                    </button>
                    <button onClick={async () => { if (!window.confirm('Delete?')) return; try { await api.delete(`/api/admin/quizzes/${q._id}`); fetchQuizzes(); toast.success('Deleted'); } catch { toast.error('Failed'); } }} className="p-1.5 rounded-lg text-foreground/30 hover:text-rust hover:bg-rust/10 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16Z"></path></svg>
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
