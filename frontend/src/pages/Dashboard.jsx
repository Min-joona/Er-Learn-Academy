import { useState, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import toast from 'react-hot-toast';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateHeatmapData() {
  const data = [];
  const now = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(now); d.setDate(d.getDate() - i);
    data.push({ date: d.toISOString().slice(0, 10), value: Math.random() > 0.3 ? Math.floor(Math.random() * 90 + 5) : 0 });
  }
  return data;
}

function generateWeekRhythm() {
  return days.map((d) => ({ day: d.slice(0, 3), minutes: Math.floor(Math.random() * 180 + 15) }));
}

export default function Dashboard() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const coverRef = useRef(null);
  const avatarRef = useRef(null);

  const setTab = (id) => setSearchParams(id === 'overview' ? {} : { tab: id });

  const mock = useMemo(() => ({
    name: user?.name || 'Simona Tecle',
    username: user?.email?.split('@')[0] || 'simona_t',
    bio: user?.bio || 'Learning English & Typing · aiming for fluency 🇪🇷',
    tier: 'Bronze Learner', points: 205,
    joined: 'Mar 2026', followers: 12, following: 5, badgeCount: 4,
    stats: { totalStudy: '95h 25m', weekStudy: '10h 25m', todayStudy: '0m', streak: 2, bestStreak: 6, lessonsCompleted: 508 },
    dailyGoal: { studied: 0, target: 120 },
    skills: [
      { label: 'English', value: 78, max: 100, color: 'rgb(var(--color-primary))', hours: 42 },
      { label: 'Computer', value: 55, max: 100, color: 'rgb(var(--color-accent-purple))', hours: 28 },
      { label: 'Typing', value: 82, max: 100, color: 'rgb(var(--color-accent-gold))', hours: 18 },
      { label: 'Tigrigna', value: 45, max: 100, color: 'rgb(var(--color-accent-blue))', hours: 8 },
      { label: 'Arabic', value: 30, max: 100, color: 'rgb(var(--color-accent-pink))', hours: 5 },
    ],
    badges: [
      { name: 'Early Bird', icon: '🌅', date: 'Apr 2026' },
      { name: 'Night Owl', icon: '🦉', date: 'May 2026' },
      { name: '10 Hour Club', icon: '⏰', date: 'May 2026' },
      { name: 'First Flame', icon: '🔥', date: 'Jun 2026' },
    ],
    leaderboard: [
      { name: 'Yonas G.', avatar: 'YG', hours: '47h', streak: 8, isYou: false, rank: 1 },
      { name: 'Simona T.', avatar: 'ST', hours: '38h', streak: 6, isYou: true, rank: 2 },
      { name: 'Amanuel B.', avatar: 'AB', hours: '31h', streak: 4, isYou: false, rank: 3 },
    ],
  }), [user]);

  const heatmapData = useMemo(() => generateHeatmapData(), []);
  const rhythmData = useMemo(() => generateWeekRhythm(), []);
  const peakDay = useMemo(() => rhythmData.reduce((a, b) => a.minutes > b.minutes ? a : b), [rhythmData]);
  const totalSkillHours = useMemo(() => mock.skills.reduce((s, k) => s + k.hours, 0), [mock]);
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ST';

  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error('File must be under 2MB');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        await api.put('/api/auth/upload', { type, data: ev.target.result });
        toast.success(`${type === 'avatar' ? 'Avatar' : 'Cover'} updated`);
      } catch { toast.error('Upload failed'); }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Profile Card */}
      <div className="povir-card overflow-hidden">
        <div className="relative h-28 lg:h-36 group cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(var(--color-primary), 0.15), rgba(var(--color-accent-purple), 0.1))' }} onClick={() => coverRef.current?.click()}>
          {user?.coverImage && <img src={user.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <svg width="20" height="20" viewBox="0 0 256 256" fill="white"><path d="M209.67,87H178.66V56a8,8,0,0,0-8-8H85.34a8,8,0,0,0-8,8V87H46.33a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H209.67a8,8,0,0,0,8-8V95A8,8,0,0,0,209.67,87ZM93.34,64h69.32V87H93.34ZM201.67,192H54.33V103H201.67Z"/></svg>
          </div>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'coverImage')} />
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 lg:-mt-14">
            <div className="flex items-end gap-4">
              <div className="relative w-[72px] h-[72px] lg:w-[88px] lg:h-[88px] rounded-2xl border-2 overflow-hidden group cursor-pointer" style={{ borderColor: 'rgb(var(--color-card))', background: 'rgb(var(--color-surface))' }} onClick={() => avatarRef.current?.click()}>
                {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{initials}</div>}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <svg width="18" height="18" viewBox="0 0 256 256" fill="white"><path d="M209.67,87H178.66V56a8,8,0,0,0-8-8H85.34a8,8,0,0,0-8,8V87H46.33a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H209.67a8,8,0,0,0,8-8V95A8,8,0,0,0,209.67,87ZM93.34,64h69.32V87H93.34ZM201.67,192H54.33V103H201.67Z"/></svg>
                </div>
              </div>
              <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'avatar')} />
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg lg:text-xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{mock.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgb(var(--color-surface))', color: 'rgb(var(--color-text-muted))' }}>@{mock.username}</span>
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: 'rgba(var(--color-accent-gold), 0.1)', color: 'rgb(var(--color-accent-gold))' }}>🔥 {mock.stats.streak}d</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'rgb(var(--color-text-muted))' }}>{mock.bio}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px]" style={{ color: 'rgb(var(--color-text-muted))' }}>
                  <span>Joined {mock.joined}</span>
                  <span>·</span>
                  <span>{mock.followers} Followers</span>
                  <span>·</span>
                  <span>{mock.following} Following</span>
                  <span>·</span>
                  <span>{mock.badgeCount} Badges</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <span className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(var(--color-primary), 0.1)', color: 'rgb(var(--color-primary))' }}>{mock.tier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {['overview', 'activity', 'courses', 'achievements'].map((tab) => (
          <button key={tab} onClick={() => setTab(tab)} className={activeTab === tab ? 'povir-tab-active' : 'povir-tab'}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: '⏱', label: 'TOTAL STUDY TIME', value: mock.stats.totalStudy, sub: 'all-time' },
          { icon: '📈', label: 'THIS WEEK', value: mock.stats.weekStudy, sub: `Today ${mock.stats.todayStudy}` },
          { icon: '🔥', label: 'STREAK', value: `${mock.stats.streak}d`, sub: `Best ${mock.stats.bestStreak}d` },
          { icon: '✅', label: 'LESSONS DONE', value: mock.stats.lessonsCompleted, sub: 'Completed' },
        ].map((s) => (
          <div key={s.label} className="povir-stat">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'rgb(var(--color-text-muted))' }}>{s.label}</span>
              <span className="text-lg">{s.icon}</span>
            </div>
            <div className="text-2xl font-bold tabular-nums" style={{ color: 'rgb(var(--color-text))' }}>{s.value}</div>
            <div className="text-[10px] mt-0.5" style={{ color: 'rgb(var(--color-text-muted))' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6 min-w-0">
          {/* Consistency Heatmap */}
          <div className="povir-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] uppercase tracking-wider font-medium" style={{ color: 'rgb(var(--color-text-muted))' }}>Consistency</h3>
              <span className="text-[10px]" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>Last 12 weeks</span>
            </div>
            <div className="grid grid-cols-[repeat(84,1fr)] gap-[2px]">
              {heatmapData.map((d, i) => {
                const intensity = d.value / 100;
                return (
                  <div key={i} className="aspect-square rounded-sm" title={`${d.date}: ${d.value} min`} style={{
                    background: d.value === 0 ? 'rgba(var(--color-text-muted), 0.05)' : `rgba(var(--color-primary), ${0.15 + intensity * 0.7})`,
                  }} />
                );
              })}
            </div>
            <div className="flex items-center gap-2 justify-end mt-2 text-[10px]" style={{ color: 'rgba(var(--color-text-muted), 0.5)' }}>
              <span>Less</span>
              {[0.05, 0.2, 0.4, 0.6, 0.85].map((o, i) => (
                <div key={i} className="w-3 h-3 rounded" style={{ background: `rgba(var(--color-primary), ${o})` }} />
              ))}
              <span>More</span>
            </div>
          </div>

          {/* Progress + Rhythm */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="povir-card p-5">
              <h3 className="text-[11px] uppercase tracking-wider font-medium mb-3" style={{ color: 'rgb(var(--color-text-muted))' }}>Progress</h3>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-lg font-bold" style={{ color: 'rgb(var(--color-text))' }}>{mock.tier}</span>
                <span className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>· {mock.points} pts</span>
              </div>
              <p className="text-[11px] mb-4" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>12 lessons attempted · 2 mastered · 17% mastery rate</p>
              <div className="space-y-3">
                {[
                  { label: 'ATTEMPTED', value: 12, max: 50 },
                  { label: 'MASTERED', value: 2, max: 12 },
                  { label: 'MASTERY RATE', value: 17, max: 100 },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>{b.label}</span>
                      <span style={{ color: 'rgba(var(--color-text-muted), 0.5)' }}>{b.value}/{b.max}</span>
                    </div>
                    <div className="povir-progress">
                      <div className="povir-progress-fill-primary" style={{ width: `${(b.value / b.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="povir-card p-5">
              <h3 className="text-[11px] uppercase tracking-wider font-medium mb-4" style={{ color: 'rgb(var(--color-text-muted))' }}>Avg minutes by weekday</h3>
              <div className="space-y-2">
                {rhythmData.map((d) => {
                  const maxMins = peakDay.minutes || 1;
                  const pct = (d.minutes / maxMins) * 100;
                  const isPeak = d.day === peakDay.day;
                  return (
                    <div key={d.day} className="flex items-center gap-3">
                      <span className={`text-[10px] w-7 text-right tabular-nums ${isPeak ? 'font-semibold' : ''}`} style={{ color: isPeak ? 'rgb(var(--color-text))' : 'rgb(var(--color-text-muted))' }}>{d.day}</span>
                      <div className="flex-1 h-5 rounded-md overflow-hidden relative" style={{ background: 'rgba(var(--color-text-muted), 0.1)' }}>
                        <div className="h-full rounded-md transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, rgba(var(--color-primary), 0.5), rgb(var(--color-primary)))' }} />
                      </div>
                      <span className={`text-[10px] w-10 text-right tabular-nums ${isPeak ? 'font-semibold' : ''}`} style={{ color: isPeak ? 'rgb(var(--color-text))' : 'rgba(var(--color-text-muted), 0.7)' }}>
                        {d.minutes}m{isPeak ? ' ★' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skills + Badges */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="povir-card p-5">
              <h3 className="text-[11px] uppercase tracking-wider font-medium mb-4" style={{ color: 'rgb(var(--color-text-muted))' }}>Skills</h3>
              <div className="h-2 rounded-full overflow-hidden flex mb-4" style={{ background: 'rgba(var(--color-text-muted), 0.1)' }}>
                {mock.skills.filter((s) => s.hours > 0).map((s, i) => (
                  <div key={i} style={{ width: `${(s.hours / totalSkillHours) * 100}%`, background: s.color, opacity: 0.7 }} />
                ))}
              </div>
              <div className="space-y-2">
                {mock.skills.sort((a, b) => b.hours - a.hours).map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                    <span style={{ color: 'rgb(var(--color-text-muted))', width: '70px' }}>{s.label}</span>
                    <span style={{ color: 'rgba(var(--color-text-muted), 0.6)', width: '35px', textAlign: 'right' }}>{s.hours}h</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(var(--color-text-muted), 0.1)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${s.value}%`, background: s.color, opacity: 0.6 }} />
                    </div>
                    <span style={{ color: 'rgba(var(--color-text-muted), 0.6)', width: '30px', textAlign: 'right' }}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="povir-card p-5">
              <h3 className="text-[11px] uppercase tracking-wider font-medium mb-4" style={{ color: 'rgb(var(--color-text-muted))' }}>Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {mock.badges.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg p-3" style={{ background: 'rgba(var(--color-surface), 0.5)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: 'rgba(var(--color-primary), 0.1)' }}>
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'rgba(var(--color-text), 0.8)' }}>{b.name}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{b.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="povir-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] uppercase tracking-wider font-medium" style={{ color: 'rgb(var(--color-text-muted))' }}>Today</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgb(var(--color-surface))', color: 'rgb(var(--color-text-muted))' }}>Goal {mock.dailyGoal.target}m</span>
            </div>
            <div className="text-3xl font-bold mb-1 tabular-nums" style={{ color: 'rgba(var(--color-text), 0.2)' }}>{mock.dailyGoal.studied} min studied</div>
            <p className="text-[11px] mb-3" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>{mock.dailyGoal.target - mock.dailyGoal.studied} min left to clear today's goal</p>
            <div className="povir-progress">
              <div className="povir-progress-fill-gradient" style={{ width: `${(mock.dailyGoal.studied / mock.dailyGoal.target) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-5">
          {/* Streak */}
          <div className="povir-card p-5 text-center">
            <span className="text-3xl mb-2 block">🔥</span>
            <div className="text-lg font-bold" style={{ color: 'rgb(var(--color-text))' }}>{mock.stats.streak} DAY STREAK</div>
            <p className="text-[10px] mt-0.5 mb-4" style={{ color: 'rgb(var(--color-text-muted))' }}>Keep it going!</p>
            <div className="flex justify-center gap-2">
              {days.map((d, i) => {
                const todayIdx = new Date().getDay();
                const filled = i <= todayIdx;
                const isToday = i === todayIdx;
                return (
                  <div key={d} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    isToday ? 'text-[rgb(var(--color-primary-text))]' : filled ? 'text-[rgb(var(--color-text))]' : 'text-[rgba(var(--color-text-muted),0.3)]'
                  }`} style={{
                    background: isToday ? 'rgb(var(--color-primary))' : filled ? 'rgba(var(--color-text-muted), 0.1)' : 'rgba(var(--color-text-muted), 0.03)',
                  }}>
                    {d[0]}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="povir-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span style={{ color: 'rgb(var(--color-accent-gold))' }}>👑</span>
                <h3 className="text-[11px] uppercase tracking-wider font-medium" style={{ color: 'rgb(var(--color-text-muted))' }}>Leaderboard</h3>
              </div>
              <button onClick={() => toast('Full leaderboard coming soon')} className="text-[10px] transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>See All</button>
            </div>
            <div className="space-y-3">
              {mock.leaderboard.map((u, i) => (
                <div key={i} className={`flex items-center gap-3 ${u.isYou ? '-mx-3 px-3 py-2 rounded-lg' : ''}`} style={{ background: u.isYou ? 'rgba(var(--color-surface), 0.5)' : 'transparent' }}>
                  <span className={`text-[10px] font-bold w-4 text-center ${u.rank === 1 ? '' : ''}`} style={{ color: u.rank === 1 ? 'rgb(var(--color-accent-gold))' : 'rgb(var(--color-text-muted))' }}>
                    {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : '🥉'}
                  </span>
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: u.isYou ? 'rgba(var(--color-primary), 0.2)' : 'rgb(var(--color-surface))', color: u.isYou ? 'rgb(var(--color-primary))' : 'rgb(var(--color-text-muted))' }}>
                    {u.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ color: 'rgb(var(--color-text))' }}>{u.name}{u.isYou ? ' (you)' : ''}</p>
                    <div className="flex items-center gap-2 text-[10px]" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>
                      <span>📈 {u.hours} today</span>
                      <span>🔥 {u.streak}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="povir-card p-5">
            <h3 className="text-[11px] uppercase tracking-wider font-medium mb-3" style={{ color: 'rgb(var(--color-text-muted))' }}>Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: '📚', label: 'Browse Courses', to: '/courses' },
                { icon: '⌨️', label: 'Typing Practice', to: '/typing' },
                { icon: '⚙️', label: 'Edit Profile', to: '/settings' },
              ].map((a) => (
                <Link key={a.label} to={a.to} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  <span>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
