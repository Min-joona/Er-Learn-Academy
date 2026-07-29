import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function ExamManager() {
  const { slug } = useParams();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get(`/api/admin/courses/${slug}/exams`).then(({ data }) => setExams(data)).catch(() => toast.error('Failed to load'));
  }, [slug]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this exam?')) return;
    try { await api.delete(`/api/admin/exams/${id}`); setExams((p) => p.filter((e) => e._id !== id)); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-[#ECE5CE]">Exams</h1>
            <p className="text-[#ECE5CE]/40 text-sm mt-1">{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/exams/new`} className="btn-primary py-2 px-4 text-sm">+ New Exam</Link>
        </div>
        {exams.length === 0 ? (
          <div className="card p-12 text-center text-[#ECE5CE]/30">No exams yet.</div>
        ) : (
          <div className="grid gap-3">
            {exams.map((ex) => (
              <div key={ex._id} className="card p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[#ECE5CE] font-medium truncate">{ex.title}</p>
                  <p className="text-[#ECE5CE]/40 text-xs truncate mt-0.5">{ex.questions?.length || 0} questions · Level {ex.level || '?'}</p>
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <Link to={`/admin/courses/${slug}/exams/${ex._id}/edit`} className="btn-outline py-1 px-3 text-xs">Edit</Link>
                  <button onClick={() => handleDelete(ex._id)} className="btn-outline py-1 px-3 text-xs text-red-400/70">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
