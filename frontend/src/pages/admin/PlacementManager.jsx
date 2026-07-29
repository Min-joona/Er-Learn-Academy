import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

export default function PlacementManager() {
  const { slug } = useParams();
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    api.get(`/api/admin/courses/${slug}/placement`).then(({ data }) => setPlacements(Array.isArray(data) ? data : [data])).catch(() => toast.error('Failed to load'));
  }, [slug]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this placement test?')) return;
    try { await api.delete(`/api/admin/placement/${id}`); setPlacements([]); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Placement Test</h1>
            <p className="text-foreground/40 text-sm mt-1">{slug}</p>
          </div>
          <div className="flex gap-2">
            {placements.length === 0 && <Link to={`/admin/courses/${slug}/placement/new`} className="btn-primary py-2 px-4 text-sm">+ Create</Link>}
          </div>
        </div>
        {placements.length === 0 ? (
          <div className="card p-12 text-center text-foreground/30">No placement test yet.</div>
        ) : (
          <div className="space-y-3">
            {placements.map((p) => (
              <div key={p._id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-foreground font-medium">Placement Test</h3>
                    <p className="text-foreground/40 text-xs">{p.questions?.length || 0} questions</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/admin/courses/${slug}/placement/${p._id}/edit`} className="btn-outline py-1 px-3 text-xs">Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="btn-outline py-1 px-3 text-xs text-red-400/70">Delete</button>
                  </div>
                </div>
                <div className="space-y-2">
                  {p.questions?.slice(0, 3).map((q, i) => (
                    <div key={i} className="bg-base rounded p-3 text-sm text-foreground/70">
                      <span className="text-amber text-xs mr-2">Q{i + 1}</span>
                      {q.question}
                    </div>
                  ))}
                  {(p.questions?.length || 0) > 3 && <p className="text-xs text-foreground/30">+{p.questions.length - 3} more</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
