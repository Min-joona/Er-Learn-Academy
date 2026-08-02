import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import api from '../api/client';

function Tester({ drill }) {
  const [typed, setTyped] = useState('');
  const [start, setStart] = useState(null);
  const [now, setNow] = useState(null);
  const [wpmHistory, setWpmHistory] = useState([]);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => { setTyped(''); setStart(null); setNow(null); setCompleted(false); setWpmHistory([]); inputRef.current?.focus(); }, [drill]);

  useEffect(() => {
    if (!start || completed) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      const elapsed = (t - start) / 60000;
      if (elapsed > 0) {
        const goodChars = typed.split('').filter((c, i) => c === drill.text[i]).length;
        setWpmHistory((h) => [...h.slice(-60), Math.round((goodChars / 5) / elapsed)]);
      }
    }, 250);
    return () => clearInterval(id);
  }, [start, completed, typed, drill.text]);

  const handleChange = useCallback((e) => {
    const v = e.target.value;
    if (completed) return;
    if (!start && v.length === 1) setStart(Date.now());
    if (v.length <= drill.text.length) setTyped(v);
    if (v === drill.text) { setCompleted(true); setNow(Date.now()); }
  }, [completed, start, drill.text]);

  const elapsedMin = start ? ((now || Date.now()) - start) / 60000 : 0;
  const correctChars = typed.split('').filter((c, i) => c === drill.text[i]).length;
  const wpm = elapsedMin > 0 ? Math.round((correctChars / 5) / elapsedMin) : 0;
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
  const progress = drill.text.length ? Math.round((typed.length / drill.text.length) * 100) : 0;

  useEffect(() => { if (activeRef.current) activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, [typed.length]);
  useEffect(() => { const handler = () => { if (!start && !completed) inputRef.current?.focus(); }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, [start, completed]);

  const reset = () => { setTyped(''); setStart(null); setNow(null); setCompleted(false); setWpmHistory([]); inputRef.current?.focus(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-primary))' }}>{wpm}</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-accent-purple))' }}>{accuracy}%</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>{drill.targetWpm}</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Goal</div>
          </div>
        </div>
        <div className="text-sm" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>
          {typed.length}/{drill.text.length} chars
        </div>
      </div>

      <div className="povir-progress mb-4">
        <div className="povir-progress-fill-gradient" style={{ width: `${progress}%` }} />
      </div>

      <div
        onClick={() => inputRef.current?.focus()}
        className="cursor-text rounded-xl p-5 md:p-8 mb-4 min-h-[120px] transition-all duration-300 border-2"
        style={{ borderColor: 'rgba(var(--color-border), 0.6)', background: 'rgba(var(--color-surface), 0.5)' }}
      >
        <div className="font-mono text-lg md:text-xl leading-[1.8] tracking-wide select-none overflow-hidden" style={{ wordSpacing: '0.25em' }}>
          {drill.text.split('').map((ch, i) => {
            let cls = 'opacity-20';
            if (i < typed.length) cls = typed[i] === ch ? 'text-[rgb(var(--color-primary))]' : 'text-[rgb(var(--color-destructive))] opacity-60';
            const isCursor = i === typed.length;
            return (
              <span key={i} ref={isCursor ? activeRef : null} className={`transition-colors duration-100 ${cls} ${isCursor ? 'typing-cursor' : ''}`} style={isCursor ? { color: 'rgb(var(--color-primary))' } : {}}>
                {ch}
              </span>
            );
          })}
        </div>
      </div>

      <input ref={inputRef} value={typed} onChange={handleChange} disabled={completed} autoFocus aria-label="Typing input" className="sr-only" />

      <div className="flex items-center gap-3 mb-4">
        <button onClick={reset} className="povir-btn-secondary py-2 px-4 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M197.67,186.37a8,8,0,0,1,0,11.32C183.47,211.89,164.46,224,144,224A96,96,0,0,1,92.37,49.39L80.59,68.19a8,8,0,0,1-13.18-9L90.12,26.32a8,8,0,0,1,11.58-2.18l34.62,26.74a8,8,0,0,1-9.18,13.11L113.1,54.77A80,80,0,1,0,208,144a79.69,79.69,0,0,0-21.21-54.26,8,8,0,0,1,11.68-10.94A96,96,0,0,1,224,144a95.72,95.72,0,0,1-26.33,66.37Z"/></svg>
          Restart
        </button>
        <p className="text-xs" style={{ color: 'rgba(var(--color-text-muted), 0.4)' }}>Click the text or press any key to start typing</p>
      </div>

      {drill.tip && (
        <div className="flex items-start gap-2 rounded-xl p-4 text-sm" style={{ background: 'rgba(var(--color-primary), 0.05)', border: '1px solid rgba(var(--color-primary), 0.1)', color: 'rgba(var(--color-text-secondary), 0.8)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="mt-0.5 shrink-0" style={{ color: 'rgb(var(--color-primary))' }}><path d="M144,160v16a16,16,0,0,1-32,0V160a8,8,0,0,1,0-16,24,24,0,1,0-19.4-38.09,8,8,0,0,1-13.2-9,40,40,0,1,1,56.68,52.29A8,8,0,0,1,144,160Zm-16,40a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,200Zm0-168A88.1,88.1,0,0,0,40,120c0,38.14,20.63,64.54,37.5,81.09A46.19,46.19,0,0,1,88,224h80a46.19,46.19,0,0,1,10.5-22.91C195.37,184.54,216,158.14,216,120A88.1,88.1,0,0,0,128,32Zm0,176H112a30.21,30.21,0,0,1,6.69-16h18.62A30.21,30.21,0,0,1,144,208Zm35.69-31.78c-10.45,11-29.19,31.78-35.69,31.78s-25.24-20.77-35.69-31.78C71.34,162.36,56,140.52,56,120a72,72,0,0,1,144,0C200,140.52,184.66,162.36,163.69,176.22Z"/></svg>
          <span><strong>Tip:</strong> {drill.tip}</span>
        </div>
      )}

      {completed && (
        <div className="mt-6 rounded-xl p-6 text-center animate-fade-in" style={{ background: 'linear-gradient(135deg, rgba(var(--color-primary), 0.1), rgba(var(--color-accent-gold), 0.05))', border: '1px solid rgba(var(--color-primary), 0.2)' }}>
          <div className="text-4xl mb-3">{wpm >= drill.targetWpm ? '🎉' : '💪'}</div>
          <p className="text-2xl font-bold" style={{ color: 'rgb(var(--color-primary))' }}>
            {wpm >= drill.targetWpm ? 'Goal achieved!' : 'Keep practicing!'}
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <div><span className="text-xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-primary))' }}>{wpm}</span><span className="text-sm ml-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>WPM</span></div>
            <div><span className="text-xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-accent-purple))' }}>{accuracy}%</span><span className="text-sm ml-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>accuracy</span></div>
          </div>
          <button onClick={reset} className="povir-btn-primary mt-4 py-2 px-6 text-sm">
            Try again
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M197.67,186.37a8,8,0,0,1,0,11.32C183.47,211.89,164.46,224,144,224A96,96,0,0,1,92.37,49.39L80.59,68.19a8,8,0,0,1-13.18-9L90.12,26.32a8,8,0,0,1,11.58-2.18l34.62,26.74a8,8,0,0,1-9.18,13.11L113.1,54.77A80,80,0,1,0,208,144a79.69,79.69,0,0,0-21.21-54.26,8,8,0,0,1,11.68-10.94A96,96,0,0,1,224,144a95.72,95.72,0,0,1-26.33,66.37Z"/></svg>
          </button>
        </div>
      )}

      {wpmHistory.length > 5 && !completed && (
        <div className="mt-4 h-12 flex items-end gap-[2px]">
          {wpmHistory.map((w, i) => (
            <div key={i} className="flex-1 rounded-t transition-all duration-150" style={{
              height: `${Math.min(100, (w / (drill.targetWpm * 1.5)) * 100)}%`,
              background: w >= drill.targetWpm ? 'rgb(var(--color-primary))' : 'rgba(var(--color-primary), 0.3)',
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Typing() {
  const [drills, setDrills] = useState([]);
  const [active, setActive] = useState(null);
  const [filterLevel, setFilterLevel] = useState('All');

  useEffect(() => { api.get('/api/content/typing').then(({ data }) => { setDrills(data); setActive(data[0]); }).catch(() => {}); }, []);

  const levels = useMemo(() => {
    const g = {};
    drills.forEach((d) => { (g[d.level] ||= []).push(d); });
    return g;
  }, [drills]);

  const filtered = filterLevel === 'All' ? drills : (levels[filterLevel] || []);

  const levelColors = {
    Beginner: 'povir-chip-primary',
    Intermediate: 'povir-chip-gold',
    Advanced: 'povir-chip-purple',
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">⌨️</span>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Typing Mastery</h1>
          <p className="mt-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>Learn to type faster and more accurately — one drill at a time.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div>
            <div className="povir-card p-4 sticky top-24">
              <div className="flex gap-1 mb-4">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <button key={l} onClick={() => setFilterLevel(l)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filterLevel === l
                        ? 'text-[rgb(var(--color-primary-text))]'
                        : 'text-[rgb(var(--color-text-secondary))]'
                    }`}
                    style={{ background: filterLevel === l ? 'rgb(var(--color-primary))' : 'rgba(var(--color-text), 0.05)' }}>
                    {l === 'All' ? 'All' : l.slice(0, 4)}
                  </button>
                ))}
              </div>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                {filtered.map((d) => (
                  <button key={d._id} onClick={() => setActive(d)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                      active?._id === d._id
                        ? 'text-[rgb(var(--color-primary))]'
                        : 'text-[rgb(var(--color-text-secondary))]'
                    }`}
                    style={{ background: active?._id === d._id ? 'rgba(var(--color-primary), 0.08)' : 'transparent' }}>
                    <span className="font-medium truncate mr-2">{d.title}</span>
                    <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full ${levelColors[d.level] || 'povir-chip-default'}`}>{d.targetWpm}wpm</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            {active ? (
              <div key={active._id} className="povir-card p-5 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{active.title}</h2>
                    <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full ${levelColors[active.level] || 'povir-chip-default'}`}>{active.level}</span>
                  </div>
                </div>
                <Tester drill={active} />
              </div>
            ) : (
              <div className="povir-card text-center py-16">
                <p className="text-4xl mb-3">⌨️</p>
                <p style={{ color: 'rgb(var(--color-text-muted))' }}>Select a drill to start typing.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
