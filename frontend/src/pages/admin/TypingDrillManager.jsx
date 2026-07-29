import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function TypingDrillManager() {
  const { slug } = useParams();
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    api.get(`/api/admin/courses/${slug}/typing-drills`).then(({ data }) => setDrills(data)).catch(() => toast.error('Failed to load'));
  }, [slug]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this drill?')) return;
    try { await api.delete(`/api/admin/typing-drills/${id}`); setDrills((p) => p.filter((d) => d._id !== id)); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Typing Drills</h1>
            <p className="text-foreground/40 text-sm mt-1">{slug}</p>
          </div>
          <Link to={`/admin/courses/${slug}/typing-drills/new`} className="btn-primary py-2 px-4 text-sm">+ New Drill</Link>
        </div>
        {drills.length === 0 ? (
          <div className="card p-12 text-center text-foreground/30">No typing drills yet.</div>
        ) : (
          <div className="grid gap-3">
            {drills.map((d) => (
              <div key={d._id} className="card p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber">{d.category || 'General'}</span>
                    <span className="text-foreground font-medium truncate">{d.title}</span>
                    <span className="text-xs text-foreground/30">{d.text?.length || 0} chars</span>
                  </div>
                  <p className="text-foreground/40 text-xs truncate mt-0.5">{d.text?.slice(0, 80)}...</p>
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <Link to={`/admin/courses/${slug}/typing-drills/${d._id}/edit`} className="btn-outline py-1 px-3 text-xs">Edit</Link>
                  <button onClick={() => handleDelete(d._id)} className="btn-outline py-1 px-3 text-xs text-red-400/70">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
