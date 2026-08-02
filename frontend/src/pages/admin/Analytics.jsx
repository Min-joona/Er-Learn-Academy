import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import Spinner from '../../components/Spinner';

function SimpleBar({ data, height = 200, color = '#777777' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div className="w-full rounded-t transition-all duration-500 relative" style={{ height: `${(d.value / max) * 100}%`, background: color, opacity: 0.7 + (d.value / max) * 0.3 }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>{d.value}</div>
          </div>
          <span className="text-[10px] truncate w-full text-center" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function SimplePie({ data, size = 180, colors = ['#777777', '#999999', '#AAAAAA', '#BBBBBB'] }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let cumulative = 0;
  const slices = data.map((d, i) => {
    const start = cumulative;
    cumulative += (d.value / total) * 360;
    const end = cumulative;
    const large = (end - start) > 180 ? 1 : 0;
    const x1 = Math.cos((start - 90) * Math.PI / 180) * 40 + 50;
    const y1 = Math.sin((start - 90) * Math.PI / 180) * 40 + 50;
    const x2 = Math.cos((end - 90) * Math.PI / 180) * 40 + 50;
    const y2 = Math.sin((end - 90) * Math.PI / 180) * 40 + 50;
    return { path: `M50 50 L${x1} ${y1} A40 40 0 ${large} 1 ${x2} ${y2} Z`, color: colors[i % colors.length], label: d.label, value: d.value };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} opacity="0.85" stroke="#555555" strokeWidth="1" />)}
        <circle cx="50" cy="50" r="20" fill="#555555" />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="#BBBBBB" fontSize="14" fontWeight="bold">{total}</text>
      </svg>
      <div className="flex flex-wrap gap-3 mt-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: colors[i % colors.length] }} />
            {d.label} ({d.value})
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleLine({ data, height = 200, color = '#777777' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1 || 1)) * 100,
    y: 100 - (d.value / max) * 80,
    label: d.label,
    value: d.value,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');

  return (
    <div className="relative" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="2.5" fill={color} stroke="#444444" strokeWidth="1" className="cursor-pointer group">
              <title>{p.label}: {p.value}</title>
            </circle>
          </g>
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-[10px]" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/admin/courses').then(({ data }) => setCourses(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categoryData = ['English', 'Computer', 'Language', 'Typing']
    .map((cat) => ({ label: cat, value: courses.filter((c) => c.category === cat).length }))
    .filter((d) => d.value > 0);

  const priceData = courses.map((c) => ({ label: c.title?.slice(0, 8) || '?', value: c.price }));
  const trendData = [
    { label: 'Jan', value: 12 }, { label: 'Feb', value: 18 }, { label: 'Mar', value: 24 },
    { label: 'Apr', value: 22 }, { label: 'May', value: 30 }, { label: 'Jun', value: 35 },
  ];

  if (loading) return <div className="pt-24 text-center"><Spinner /></div>;

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Analytics</h1>
            <p className="mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>Data and insights for your academy.</p>
          </div>
          <Link to="/admin/courses" className="povir-btn-secondary py-2 px-4 text-sm">← Back</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Courses', value: courses.length, icon: '📚' },
            { label: 'Categories', value: categoryData.length, icon: '📂' },
            { label: 'Free', value: courses.filter((c) => c.price === 0).length, icon: '🎁' },
            { label: 'Paid', value: courses.filter((c) => c.price > 0).length, icon: '💰' },
          ].map((s) => (
            <div key={s.label} className="povir-card p-5 text-center">
              <span className="text-2xl mb-2 block">{s.icon}</span>
              <div className="text-2xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-text))' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="povir-card p-6">
            <h3 className="font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>Courses by Category</h3>
            {categoryData.length > 0 ? <SimplePie data={categoryData} /> : <p className="text-sm text-center py-8" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>No data</p>}
          </div>
          <div className="povir-card p-6">
            <h3 className="font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>Enrollment Trend</h3>
            <SimpleLine data={trendData} color="#777777" />
          </div>
        </div>

        {priceData.length > 0 && (
          <div className="povir-card p-6">
            <h3 className="font-semibold mb-4" style={{ color: 'rgb(var(--color-text))' }}>Course Prices</h3>
            <SimpleBar data={priceData} height={200} color="#777777" />
          </div>
        )}
      </div>
    </div>
  );
}
