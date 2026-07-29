export default function RadarChart({ data = [], size = 200, levels = 5 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;

  const pt = (i, radius) => {
    const a = angleStep * i - Math.PI / 2;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  };

  const ring = (level) => {
    const radius = r * (level / (levels - 1));
    return Array.from({ length: n }, (_, i) => pt(i, radius))
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(' ') + 'Z';
  };

  const dataPath = data.map((d, i) => pt(i, r * (d.value / (d.max || 100))))
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ') + 'Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: levels }, (_, i) => (
        <path key={i} d={ring(i)} fill="none" stroke="rgba(236,229,206,0.08)" strokeWidth="1" />
      ))}
      {data.map((_, i) => {
        const p = pt(i, r);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(236,229,206,0.08)" strokeWidth="1" />;
      })}
      {data.map((d, i) => {
        const p = pt(i, r * 1.15);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="rgba(236,229,206,0.4)" fontSize="9" fontWeight="500">
            {d.label}
          </text>
        );
      })}
      {data.map((d, i) => {
        const p = pt(i, r * (d.value / (d.max || 100)));
        return <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#E08E79" />;
      })}
      <path d={dataPath} fill="rgba(224,142,121,0.12)" stroke="#E08E79" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
