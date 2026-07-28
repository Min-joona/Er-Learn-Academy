import { useMemo } from 'react';

const SIZE = 13;
const GAP = 3;

export default function Heatmap({ data = [], weeks = 12, className = '' }) {
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 6);

  const cells = useMemo(() => {
    const map = {};
    data.forEach((d) => { map[d.date] = d.value; });
    const result = [];
    for (let w = weeks - 1; w >= 0; w--) {
      for (let d = 6; d >= 0; d--) {
        const date = new Date(endOfWeek);
        date.setDate(endOfWeek.getDate() - (w * 7 + d));
        const key = date.toISOString().slice(0, 10);
        result.push({ date: key, value: map[key] || 0, x: w * (SIZE + GAP), y: d * (SIZE + GAP) });
      }
    }
    return result;
  }, [data, weeks]);

  const maxVal = Math.max(...cells.map((c) => c.value), 1);

  const getColor = (v) => {
    if (v === 0) return '#1F1822';
    const i = Math.min(Math.floor((v / maxVal) * 4), 3);
    return ['#CC883A44', '#CC883A77', '#CC883ABB', '#CC883A'][i];
  };

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const padL = 28, padT = 20;
  const w = weeks * (SIZE + GAP) + padL + 8;
  const h = 7 * (SIZE + GAP) + padT + 4;

  const monthLabels = [];
  let last = -1;
  for (let w = 0; w < weeks; w++) {
    const date = new Date(endOfWeek);
    date.setDate(endOfWeek.getDate() - ((weeks - 1 - w) * 7 + 6));
    const m = date.getMonth();
    if (m !== last) { monthLabels.push({ label: date.toLocaleString('default', { month: 'short' }), x: padL + w * (SIZE + GAP) + SIZE / 2 }); last = m; }
  }

  return (
    <svg width={w} height={h} className={className}>
      {monthLabels.map((m, i) => (
        <text key={i} x={m.x} y={11} textAnchor="start" fill="rgba(207,200,154,0.25)" fontSize="9">{m.label}</text>
      ))}
      {dayLabels.map((d, i) => d ? (
        <text key={i} x={padL - 4} y={padT + i * (SIZE + GAP) + SIZE - 2} textAnchor="end" fill="rgba(207,200,154,0.25)" fontSize="8">{d}</text>
      ) : null)}
      {cells.map((c, i) => (
        <rect key={i} x={padL + c.x} y={padT + c.y} width={SIZE} height={SIZE} rx={3} fill={getColor(c.value)}>
          <title>{c.date} — {c.value} min</title>
        </rect>
      ))}
    </svg>
  );
}
