import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import api from '../api/client';

/* ===================== REALITY: typing.com-style ===================== */
function Tester({ drill }) {
  const [typed, setTyped] = useState('');
  const [start, setStart] = useState(null);
  const [now, setNow] = useState(null);
  const [wpmHistory, setWpmHistory] = useState([]);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
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

  // Auto scroll active position into view
  useEffect(() => {
    if (activeRef.current) activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [typed.length]);

  // Start on any keypress
  useEffect(() => {
    const handler = () => { if (!start && !completed) inputRef.current?.focus(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [start, completed]);

  const reset = () => { setTyped(''); setStart(null); setNow(null); setCompleted(false); setWpmHistory([]); inputRef.current?.focus(); };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber tabular-nums">{wpm}</div>
            <div className="text-[10px] text-[#CFC89A]/40 uppercase tracking-wider">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sage tabular-nums">{accuracy}%</div>
            <div className="text-[10px] text-[#CFC89A]/40 uppercase tracking-wider">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#CFC89A]/30 tabular-nums">{drill.targetWpm}</div>
            <div className="text-[10px] text-[#CFC89A]/40 uppercase tracking-wider">Goal</div>
          </div>
        </div>
        <div className="text-sm text-[#CFC89A]/30">
          {typed.length}/{drill.text.length} chars
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-[#CFC89A]/10 mb-4 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-amber to-rust transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      {/* Type area */}
      <div
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        className="cursor-text rounded-2xl border-2 border-[#CFC89A]/10 bg-[#322938]/80 p-5 md:p-8 mb-4 min-h-[120px] transition-all duration-300 focus-within:border-amber/30 focus-within:shadow-lg focus-within:shadow-amber/5"
      >
        <div className="font-mono text-lg md:text-xl leading-[1.8] tracking-wide select-none overflow-hidden" style={{ wordSpacing: '0.25em' }}>
          {drill.text.split('').map((ch, i) => {
            let cls = 'text-[#CFC89A]/20';
            if (i < typed.length) cls = typed[i] === ch ? 'text-amber' : 'bg-rust/30 text-rust rounded';
            const isCursor = i === typed.length;
            return (
              <span key={i} ref={isCursor ? activeRef : null} className={`transition-colors duration-100 ${cls} ${isCursor ? 'typing-cursor' : ''}`}>
                {ch}
              </span>
            );
          })}
        </div>
      </div>

      {/* Hidden input */}
      <input ref={inputRef} value={typed} onChange={handleChange} disabled={completed} autoFocus aria-label="Typing input" className="sr-only" />

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={reset} className="btn-outline py-2 px-4 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M197.67,186.37a8,8,0,0,1,0,11.32C183.47,211.89,164.46,224,144,224A96,96,0,0,1,92.37,49.39L80.59,68.19a8,8,0,0,1-13.18-9L90.12,26.32a8,8,0,0,1,11.58-2.18l34.62,26.74a8,8,0,0,1-9.18,13.11L113.1,54.77A80,80,0,1,0,208,144a79.69,79.69,0,0,0-21.21-54.26,8,8,0,0,1,11.68-10.94A96,96,0,0,1,224,144a95.72,95.72,0,0,1-26.33,66.37Z"></path></svg>
          Restart
        </button>
        <p className="text-xs text-[#CFC89A]/30">Click the text or press any key to start typing</p>
      </div>

      {/* Tip */}
      {drill.tip && (
        <div className="flex items-start gap-2 rounded-xl bg-amber/5 border border-amber/10 p-4 text-sm text-amber/70">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="mt-0.5 shrink-0"><path d="M144,160v16a16,16,0,0,1-32,0V160a8,8,0,0,1,0-16,24,24,0,1,0-19.4-38.09,8,8,0,0,1-13.2-9,40,40,0,1,1,56.68,52.29A8,8,0,0,1,144,160Zm-16,40a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,200Zm0-168A88.1,88.1,0,0,0,40,120c0,38.14,20.63,64.54,37.5,81.09A46.19,46.19,0,0,1,88,224h80a46.19,46.19,0,0,1,10.5-22.91C195.37,184.54,216,158.14,216,120A88.1,88.1,0,0,0,128,32Zm0,176H112a30.21,30.21,0,0,1,6.69-16h18.62A30.21,30.21,0,0,1,144,208Zm35.69-31.78c-10.45,11-29.19,31.78-35.69,31.78s-25.24-20.77-35.69-31.78C71.34,162.36,56,140.52,56,120a72,72,0,0,1,144,0C200,140.52,184.66,162.36,163.69,176.22Z"></path></svg>
          <span><strong className="text-amber">Tip:</strong> {drill.tip}</span>
        </div>
      )}

      {/* Completion */}
      {completed && (
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber/10 to-rust/10 border border-amber/20 p-6 text-center animate-scale-in">
          <div className="text-4xl mb-3">{wpm >= drill.targetWpm ? '🎉' : '💪'}</div>
          <p className="font-display text-2xl font-bold text-amber">
            {wpm >= drill.targetWpm ? 'Goal achieved!' : 'Keep practicing!'}
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <div><span className="text-xl font-bold text-amber tabular-nums">{wpm}</span><span className="text-sm text-[#CFC89A]/40 ml-1">WPM</span></div>
            <div><span className="text-xl font-bold text-sage tabular-nums">{accuracy}%</span><span className="text-sm text-[#CFC89A]/40 ml-1">accuracy</span></div>
          </div>
          <button onClick={reset} className="btn-primary mt-4 py-2 px-6 text-sm">
            Try again
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M197.67,186.37a8,8,0,0,1,0,11.32C183.47,211.89,164.46,224,144,224A96,96,0,0,1,92.37,49.39L80.59,68.19a8,8,0,0,1-13.18-9L90.12,26.32a8,8,0,0,1,11.58-2.18l34.62,26.74a8,8,0,0,1-9.18,13.11L113.1,54.77A80,80,0,1,0,208,144a79.69,79.69,0,0,0-21.21-54.26,8,8,0,0,1,11.68-10.94A96,96,0,0,1,224,144a95.72,95.72,0,0,1-26.33,66.37Z"></path></svg>
          </button>
        </div>
      )}

      {/* Live WPM mini graph */}
      {wpmHistory.length > 5 && !completed && (
        <div className="mt-4 h-12 flex items-end gap-[2px]">
          {wpmHistory.map((w, i) => (
            <div
              key={i}
              className="flex-1 rounded-t transition-all duration-150"
              style={{
                height: `${Math.min(100, (w / (drill.targetWpm * 1.5)) * 100)}%`,
                background: w >= drill.targetWpm ? '#CC883A' : '#CC883A40',
              }}
            />
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

  const levelColors = { Beginner: 'bg-green-900/30 text-green-400 border-green-800/30', Intermediate: 'bg-yellow-900/30 text-yellow-400 border-yellow-800/30', Advanced: 'bg-red-900/30 text-red-400 border-red-800/30' };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">⌨️</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#CFC89A]">Typing Mastery</h1>
          <p className="text-[#CFC89A]/50 mt-1">Learn to type faster and more accurately — one drill at a time.</p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <div>
            <div className="card p-4 sticky top-24">
              <div className="flex gap-1 mb-4">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <button key={l} onClick={() => setFilterLevel(l)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${filterLevel === l ? 'bg-amber text-white' : 'bg-[#CFC89A]/5 text-[#CFC89A]/40 hover:text-[#CFC89A]/70'}`}>
                    {l === 'All' ? 'All' : l.slice(0, 4)}
                  </button>
                ))}
              </div>
              <div className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
                {filtered.map((d) => (
                  <button key={d._id} onClick={() => setActive(d)} className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${active?._id === d._id ? 'border-amber bg-amber/5 text-[#CFC89A]' : 'border-transparent text-[#CFC89A]/40 hover:text-[#CFC89A]/70 hover:bg-[#CFC89A]/5'}`}>
                    <span className="font-medium truncate mr-2">{d.title}</span>
                    <span className={`shrink-0 pill text-[10px] ${(levelColors)[d.level] || 'bg-[#CFC89A]/5 text-[#CFC89A]/30'}`}>{d.targetWpm}wpm</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main */}
          <div>
            {active ? (
              <div key={active._id} className="card p-5 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-display font-bold text-[#CFC89A]">{active.title}</h2>
                    <span className={`inline-block mt-1 pill text-xs ${levelColors[active.level] || 'bg-[#CFC89A]/5 text-[#CFC89A]/30'}`}>{active.level}</span>
                  </div>
                </div>
                <Tester drill={active} />
              </div>
            ) : (
              <div className="card text-center py-16">
                <p className="text-4xl mb-3">⌨️</p>
                <p className="text-[#CFC89A]/50">Select a drill to start typing.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
