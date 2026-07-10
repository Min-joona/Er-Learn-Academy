import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Zap, Target, RotateCcw, Lightbulb, Trophy } from 'lucide-react';
import api from '../api/client';

const levelColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
};

function Tester({ drill }) {
  const [typed, setTyped] = useState('');
  const [start, setStart] = useState(null);
  const [now, setNow] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { setTyped(''); setStart(null); setNow(null); inputRef.current?.focus(); }, [drill]);
  useEffect(() => {
    if (!start || typed === drill.text) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [start, typed, drill.text]);

  const onChange = (e) => {
    const v = e.target.value;
    if (!start && v.length === 1) setStart(Date.now());
    if (v.length <= drill.text.length) setTyped(v);
    if (v === drill.text) setNow(Date.now());
  };

  const done = typed === drill.text;
  const elapsedMin = start ? ((now || Date.now()) - start) / 60000 : 0;
  const correctChars = typed.split('').filter((c, i) => c === drill.text[i]).length;
  const wpm = elapsedMin > 0 ? Math.round((correctChars / 5) / elapsedMin) : 0;
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <span className="flex items-center gap-1 rounded-xl bg-teal/10 px-4 py-2 font-bold text-teal"><Zap size={16} /> {wpm} WPM</span>
        <span className="flex items-center gap-1 rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-600"><Target size={16} /> {accuracy}%</span>
        <span className="flex items-center gap-1 rounded-xl bg-ink/5 px-4 py-2 font-bold text-ink/60">Goal: {drill.targetWpm} WPM</span>
      </div>

      {/* Text to type with per-character coloring */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="cursor-text rounded-2xl border-2 border-ink/10 bg-white p-4 md:p-6 font-mono text-lg md:text-xl leading-relaxed tracking-wide"
      >
        {drill.text.split('').map((ch, i) => {
          let cls = 'text-ink/30';
          if (i < typed.length) cls = typed[i] === ch ? 'text-teal' : 'bg-red-200 text-red-700 rounded';
          const cursor = i === typed.length ? 'border-l-2 border-teal animate-pulse' : '';
          return <span key={i} className={`${cls} ${cursor}`}>{ch}</span>;
        })}
      </div>

      <input ref={inputRef} value={typed} onChange={onChange} disabled={done} className="sr-only" autoFocus aria-label="Typing input" />

      <div className="mt-4 flex items-center gap-3">
        <button onClick={() => { setTyped(''); setStart(null); setNow(null); inputRef.current?.focus(); }} className="btn-outline"><RotateCcw size={16} /> Restart</button>
        <p className="text-sm text-ink/50">Click the text box and start typing — no peeking at the keyboard!</p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-2xl bg-yellow-50 p-4 text-sm text-yellow-800">
        <Lightbulb size={18} className="mt-0.5 shrink-0" /> <span><strong>Tip:</strong> {drill.tip}</span>
      </div>

      {done && (
        <div className="mt-4 rounded-2xl bg-teal/10 p-5 text-center">
          <Trophy className="mx-auto text-teal" />
          <p className="mt-1 font-display text-xl font-extrabold text-teal">
            {wpm >= drill.targetWpm ? 'Goal smashed! 🎉' : 'Nice — keep practicing! 💪'}
          </p>
          <p className="text-sm text-ink/60">{wpm} WPM at {accuracy}% accuracy</p>
        </div>
      )}
    </div>
  );
}

export default function Typing() {
  const [drills, setDrills] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => { api.get('/api/content/typing').then(({ data }) => { setDrills(data); setActive(data[0]); }); }, []);

  const grouped = useMemo(() => {
    const g = {};
    drills.forEach((d) => { (g[d.level] ||= []).push(d); });
    return g;
  }, [drills]);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-white"><Keyboard size={24} /></span>
        <div>
          <h1 className="font-display text-3xl font-extrabold">Typing Mastery ⌨️</h1>
          <p className="text-ink/60">Learn to type fast without looking — beginner to pro.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Drill list */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([level, items]) => (
            <div key={level}>
              <p className={`pill mb-2 inline-block ${levelColor[level]}`}>{level}</p>
              <div className="space-y-2">
                {items.map((d) => (
                  <button key={d._id} onClick={() => setActive(d)} className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-2.5 text-left text-sm font-semibold ${active?._id === d._id ? 'border-teal bg-teal/5' : 'border-ink/10'}`}>
                    {d.title}<span className="text-xs text-ink/40">{d.targetWpm} wpm</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tester */}
        <div className="lg:col-span-2">
          {active && <><h2 className="mb-3 font-display text-xl font-extrabold">{active.title}</h2><Tester drill={active} /></>}
        </div>
      </div>
    </div>
  );
}
