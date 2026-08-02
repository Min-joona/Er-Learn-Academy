import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';
import DeleteButton from '../../components/DeleteButton';

export default function PlacementManager() {
  const { slug } = useParams();
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    api.get(`/api/admin/courses/${slug}/placement`).then(({ data }) => setPlacements(Array.isArray(data) ? data : [data])).catch(() => toast.error('Failed to load'));
  }, [slug]);

  const handleDelete = async (id) => {
    try { await api.delete(`/api/admin/placement/${id}`); setPlacements([]); toast.success('Deleted'); } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Placement Test</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{slug}</p>
          </div>
          <div className="flex gap-2">
            {placements.length === 0 && <Link to={`/admin/courses/${slug}/placement/new`} className="povir-btn-primary py-2 px-4 text-sm">+ Create</Link>}
          </div>
        </div>
        {placements.length === 0 ? (
          <div className="povir-card p-12 text-center" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>No placement test yet.</div>
        ) : (
          <div className="space-y-3">
            {placements.map((p) => (
              <div key={p._id} className="povir-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium" style={{ color: 'rgb(var(--color-text))' }}>Placement Test</h3>
                    <p className="text-xs" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{p.questions?.length || 0} questions</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/admin/courses/${slug}/placement/${p._id}/edit`} className="povir-btn-secondary py-1 px-3 text-xs">Edit</Link>
                    <DeleteButton onDelete={() => handleDelete(p._id)} confirmMessage="Delete this placement test?" />
                  </div>
                </div>
                <div className="space-y-2">
                  {p.questions?.slice(0, 3).map((q, i) => (
                    <div key={i} className="rounded p-3 text-sm" style={{ background: 'rgba(var(--color-text-muted), 0.05)', color: 'rgba(var(--color-text), 0.8)' }}>
                      <span className="text-xs mr-2" style={{ color: 'rgb(var(--color-accent-gold))' }}>Q{i + 1}</span>
                      {q.question}
                    </div>
                  ))}
                  {(p.questions?.length || 0) > 3 && <p className="text-xs" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>+{p.questions.length - 3} more</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
