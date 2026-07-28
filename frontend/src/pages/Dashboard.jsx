import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  House, Clock, TrendUp, Fire, CheckCircle, BookOpen, Keyboard,
  Clipboard, Trophy, Bell, User, Crown, CaretRight, GameController,
  Star, SignOut, ChartBar, Sparkle, UsersThree, MagnifyingGlass,
  GraduationCap, Flag, ChatCircleDots, HeartStraight, Gauge,
  PlusCircle, Sun, Moon, CalendarBlank, NotePencil,
} from 'phosphor-react';
import Heatmap from '../components/Heatmap';
import RadarChart from '../components/RadarChart';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { icon: House, label: 'Home', to: '/dashboard' },
  { icon: Clock, label: 'Study History', to: '#history' },
  { icon: BookOpen, label: 'Lessons', to: '/courses' },
  { icon: Keyboard, label: 'Typing', to: '/typing' },
  { icon: Clipboard, label: 'Placement', to: '#placement' },
  { icon: Trophy, label: 'Leaderboard', to: '#leaderboard' },
  { icon: Bell, label: 'Notifications', to: '#notifications' },
  { icon: User, label: 'Profile', to: '#profile' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateHeatmapData() {
  const data = [];
  const now = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().slice(0, 10),
      value: Math.random() > 0.3 ? Math.floor(Math.random() * 90 + 5) : 0,
    });
  }
  return data;
}

function generateWeekRhythm() {
  return days.map((d) => ({
    day: d.slice(0, 3),
    minutes: Math.floor(Math.random() * 180 + 15),
  }));
}

export default function Dashboard() {
  const { user } = useAuth();
  const { dark: theme, toggle: toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');

  const mock = useMemo(() => ({
    name: user?.name || 'Simona Tecle',
    username: user?.email?.split('@')[0] || 'simona_t',
    bio: 'Learning English & Typing · aiming for fluency 🇪🇷',
    tier: 'Bronze Learner',
    points: 205,
    joined: 'Mar 2026',
    followers: 12,
    following: 5,
    badgeCount: 4,
    stats: {
      totalStudy: '95h 25m',
      weekStudy: '10h 25m',
      todayStudy: '0m',
      streak: 2,
      bestStreak: 6,
      lessonsCompleted: 508,
    },
    dailyGoal: { studied: 0, target: 120 },
    skills: [
      { label: 'English', value: 78, max: 100, color: '#CC883A', hours: 42 },
      { label: 'Computer', value: 55, max: 100, color: '#89A194', hours: 28 },
      { label: 'Typing', value: 82, max: 100, color: '#A14016', hours: 18 },
      { label: 'Tigrigna', value: 45, max: 100, color: '#CFC89A', hours: 8 },
      { label: 'Arabic', value: 30, max: 100, color: '#CC883A', hours: 5 },
    ],
    badges: [
      { name: 'Early Bird', icon: Sun, date: 'Apr 2026', color: '#CC883A' },
      { name: 'Night Owl', icon: Moon, date: 'May 2026', color: '#89A194' },
      { name: '10 Hour Club', icon: Clock, date: 'May 2026', color: '#A14016' },
      { name: 'First Flame', icon: Fire, date: 'Jun 2026', color: '#CC883A' },
    ],
    leaderboard: [
      { name: 'Yonas G.', avatar: 'YG', hours: '47h', streak: 8, isYou: false, rank: 1 },
      { name: 'Simona T.', avatar: 'ST', hours: '38h', streak: 6, isYou: true, rank: 2 },
      { name: 'Amanuel B.', avatar: 'AB', hours: '31h', streak: 4, isYou: false, rank: 3 },
    ],
    suggestions: [
      { name: 'Meron K.', avatar: 'MK', streak: 5 },
      { name: 'Eden H.', avatar: 'EH', streak: 3 },
    ],
  }), [user]);

  const heatmapData = useMemo(() => generateHeatmapData(), []);
  const rhythmData = useMemo(() => generateWeekRhythm(), []);
  const peakDay = useMemo(() => rhythmData.reduce((a, b) => a.minutes > b.minutes ? a : b), [rhythmData]);
  const totalSkillHours = useMemo(() => mock.skills.reduce((s, k) => s + k.hours, 0), [mock]);

  return (
    <div className=" pt-20 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col items-center w-[72px] shrink-0 border-r border-white/[0.06] py-6 gap-1 sticky top-20 self-start h-[calc(100vh-5rem)]">
        {navItems.map((item) => (
          <Link key={item.label} to={item.to} title={item.label}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-amber hover:bg-amber/10 transition-all group relative">
            <item.icon size={20} />
            <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-[#1F1822] text-[#CFC89A] text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/5">
              {item.label}
            </span>
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 p-4 lg:p-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-display font-bold text-[#CFC89A]">Dashboard</h1>
              <p className="text-xs text-white/25 mt-0.5">Welcome back, {mock.name.split(' ')[0]}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* 7-day streak tracker */}
              <div className="hidden sm:flex items-center gap-1.5 bg-white/[0.03] rounded-xl px-3 py-2">
                {days.map((d, i) => {
                  const todayIdx = new Date().getDay();
                  const isToday = i === todayIdx;
                  const filled = i <= todayIdx;
                  return (
                    <div key={d} className="flex flex-col items-center gap-0.5">
                      <span className="text-[8px] text-white/20 uppercase">{d[0]}</span>
                      <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold ${
                        isToday ? 'bg-amber text-[#1F1822]' : filled ? 'bg-amber/30 text-amber' : 'bg-white/5 text-white/15'
                      }`}>
                        {isToday ? '✓' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-amber transition-colors relative">
                <Bell size={16} />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber rounded-full text-[8px] font-bold text-[#1F1822] flex items-center justify-center">2</span>
              </button>
              <button onClick={toggleTheme} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-amber transition-colors">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center text-amber text-xs font-bold">
                {mock.avatar}
              </div>
            </div>
          </div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* Left / Center */}
            <div className="space-y-6 min-w-0">

              {/* Profile Banner */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                <div className="h-28 bg-gradient-to-r from-amber/10 via-sage/5 to-[#1F1822] relative">
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #CC883A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                </div>
                <div className="px-5 pb-4">
                  <div className="flex items-end justify-between -mt-10">
                    <div className="flex items-end gap-4">
                      <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-amber to-rust flex items-center justify-center text-2xl font-bold text-white shadow-lg border-2 border-[#1F1822] shrink-0">
                        {mock.avatar}
                      </div>
                      <div className="pb-0.5">
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-[#CFC89A]">{mock.name}</h2>
                          <span className="text-xs bg-amber/10 text-amber px-2 py-0.5 rounded-full font-medium">@{mock.username}</span>
                          <span className="flex items-center gap-1 text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                            <Fire size={10} weight="fill" className="text-amber" /> {mock.stats.streak}d
                          </span>
                        </div>
                        <p className="text-xs text-white/30 mt-0.5">{mock.bio}</p>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[10px] text-white/20">Joined {mock.joined}</span>
                          <span className="text-[10px] text-white/20">·</span>
                          <span className="text-[10px] text-white/30">{mock.followers} Followers</span>
                          <span className="text-[10px] text-white/20">·</span>
                          <span className="text-[10px] text-white/30">{mock.following} Following</span>
                          <span className="text-[10px] text-white/20">·</span>
                            <span className="text-[10px] text-white/30">{mock.badgeCount} Badges</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pb-0.5">
                      <span className="text-[10px] bg-amber/10 text-amber px-2.5 py-1 rounded-full font-medium">{mock.tier}</span>
                      <button className="text-[11px] border border-white/10 text-white/40 hover:text-amber hover:border-amber/30 px-3 py-1 rounded-full transition-colors">Follow</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: Clock, label: 'TOTAL STUDY TIME', value: mock.stats.totalStudy, sub: 'all-time', color: 'text-amber' },
                  { icon: TrendUp, label: 'THIS WEEK', value: mock.stats.weekStudy, sub: `Today ${mock.stats.todayStudy}`, color: 'text-sage' },
                  { icon: Fire, label: 'STREAK', value: `${mock.stats.streak}d`, sub: `Best ${mock.stats.bestStreak}d`, color: 'text-amber' },
                  { icon: CheckCircle, label: 'LESSONS DONE', value: mock.stats.lessonsCompleted, sub: 'Completed', color: 'text-sage' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-white/20 font-medium">{s.label}</span>
                      <s.icon size={16} className="text-white/15" />
                    </div>
                    <div className={`text-2xl font-bold ${s.color} tabular-nums`}>{s.value}</div>
                    <div className="text-[10px] text-white/20 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Heatmap */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Consistency</h3>
                    <span className="text-[10px] text-white/10">Last 12 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/20">
                    <span>Less</span>
                    {['#1F1822', '#CC883A44', '#CC883A77', '#CC883ABB', '#CC883A'].map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded" style={{ background: c }} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
                <div className="overflow-x-auto pb-1">
                  <Heatmap data={heatmapData} weeks={12} className="min-w-[400px]" />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2">
                {['overview', 'activity', 'followers', 'following'].map((tab) => (
                  <button key={tab} onClick={() => setActiveSection(tab)}
                    className={`text-[11px] px-3.5 py-1.5 rounded-full font-medium transition-all capitalize ${
                      activeSection === tab ? 'bg-amber text-[#1F1822]' : 'text-white/30 hover:text-white/50'
                    }`}>
                    {tab}{tab === 'followers' ? ' (12)' : tab === 'following' ? ' (5)' : ''}
                  </button>
                ))}
              </div>

              {/* Progress + Rhythm side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Progress Card */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Progress</h3>
                    <GraduationCap size={16} className="text-white/15" />
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-lg font-bold text-amber">{mock.tier}</span>
                    <span className="text-xs text-white/30">· {mock.points} pts</span>
                  </div>
                  <p className="text-[11px] text-white/20 mb-4">12 lessons attempted · 2 mastered · 17% mastery rate</p>
                  <div className="space-y-3">
                    {[
                      { label: 'ATTEMPTED', value: 12, max: 50, color: 'bg-amber/60' },
                      { label: 'MASTERED', value: 2, max: 12, color: 'bg-sage' },
                      { label: 'MASTERY RATE', value: 17, max: 100, color: 'bg-amber' },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-white/25">{b.label}</span>
                          <span className="text-white/15">{b.value}/{b.max}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className={`h-full rounded-full ${b.color} transition-all duration-500`} style={{ width: `${(b.value / b.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rhythm Card */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium mb-4">Avg minutes by weekday</h3>
                  <div className="space-y-2">
                    {rhythmData.map((d) => {
                      const maxMins = peakDay.minutes || 1;
                      const pct = (d.minutes / maxMins) * 100;
                      const isPeak = d.day === peakDay.day;
                      return (
                        <div key={d.day} className="flex items-center gap-3">
                          <span className={`text-[10px] w-7 text-right ${isPeak ? 'text-amber font-semibold' : 'text-white/20'}`}>{d.day}</span>
                          <div className="flex-1 h-5 rounded-md bg-white/5 overflow-hidden relative">
                            <div className="h-full rounded-md bg-gradient-to-r from-amber/70 to-amber transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                          <span className={`text-[10px] w-10 text-right tabular-nums ${isPeak ? 'text-amber font-semibold' : 'text-white/25'}`}>
                            {d.minutes}m{isPeak ? ' ★' : ''}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Skills + Badges side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Skill Specialty */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Skill Specialty</h3>
                    <span className="text-[10px] text-white/20">{totalSkillHours}h tracked</span>
                  </div>
                  {/* Segmented bar */}
                  <div className="h-2 rounded-full overflow-hidden flex mb-4">
                    {mock.skills.filter((s) => s.hours > 0).map((s, i) => (
                      <div key={i} style={{ width: `${(s.hours / totalSkillHours) * 100}%`, background: s.color, opacity: 0.7 }} />
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <RadarChart data={mock.skills} size={200} />
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {mock.skills.sort((a, b) => b.hours - a.hours).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px]">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                        <span className="text-white/40 w-16">{s.label}</span>
                        <span className="text-white/20 w-10 tabular-nums">{s.hours}h</span>
                        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${s.value}%`, background: s.color, opacity: 0.6 }} />
                        </div>
                        <span className="text-white/25 w-8 text-right tabular-nums">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Achievements</h3>
                    <span className="text-[10px] text-amber">{mock.badges.length} earned</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {mock.badges.map((b, i) => {
                      const IconComp = b.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${b.color}22` }}>
                            <IconComp size={18} className="text-amber" weight="fill" />
                          </div>
                          <div>
                            <p className="text-[11px] text-white/60 font-medium">{b.name}</p>
                            <p className="text-[9px] text-white/15">{b.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Daily Goal */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Today</h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-white/5 text-white/25 px-2 py-0.5 rounded-full">Goal {mock.dailyGoal.target}m</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white/10 mb-1 tabular-nums">{mock.dailyGoal.studied} min studied</div>
                <p className="text-[11px] text-white/20 mb-3">{mock.dailyGoal.target - mock.dailyGoal.studied} min left to clear today's goal of {mock.dailyGoal.target} min</p>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber/50 to-amber transition-all duration-500" style={{ width: `${(mock.dailyGoal.studied / mock.dailyGoal.target) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-5">
              {/* Streak Widget */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
                <Fire size={28} className="mx-auto text-amber mb-2" weight="fill" />
                <div className="text-lg font-bold text-[#CFC89A]">{mock.stats.streak} DAY STREAK</div>
                <p className="text-[10px] text-white/20 mt-0.5 mb-4">Streak active today 🔥</p>
                <div className="flex justify-center gap-2">
                  {days.map((d, i) => {
                    const todayIdx = new Date().getDay();
                    const filled = i <= todayIdx;
                    const isToday = i === todayIdx;
                    return (
                      <div key={d} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                        isToday ? 'bg-amber text-[#1F1822] ring-2 ring-amber/40' : filled ? 'bg-amber/25 text-amber' : 'bg-white/5 text-white/15'
                      }`}>
                        {d[0]}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Crown size={16} className="text-amber" weight="fill" />
                    <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Leaderboard</h3>
                  </div>
                  <Link to="#leaderboard" className="text-[10px] text-amber/60 hover:text-amber">See All</Link>
                </div>
                <div className="space-y-3">
                  {mock.leaderboard.map((u, i) => (
                    <div key={i} className={`flex items-center gap-3 ${u.isYou ? 'bg-amber/[0.04] -mx-3 px-3 py-2 rounded-lg' : ''}`}>
                      <span className={`text-[10px] font-bold w-4 text-center ${u.rank === 1 ? 'text-amber' : 'text-white/20'}`}>#{u.rank}</span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                        u.isYou ? 'bg-amber/20 text-amber' : 'bg-white/10 text-white/40'
                      }`}>{u.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-white/60 truncate">{u.name}{u.isYou ? ' (you)' : ''}</p>
                        <div className="flex items-center gap-2 text-[9px] text-white/20">
                          <TrendUp size={10} />
                          <span>{u.hours} today</span>
                          <Fire size={10} className="text-amber" weight="fill" />
                          <span>{u.streak}</span>
                        </div>
                      </div>
                      {u.rank === 1 && <Crown size={14} className="text-amber shrink-0" weight="fill" />}
                    </div>
                  ))}
                  {mock.leaderboard.filter((u) => u.rank === 1).map((u) => (
                    <div key="bar" className="h-1 rounded-full bg-white/5 overflow-hidden -mx-3">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber/40 to-amber" style={{ width: '68%' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] uppercase tracking-widest text-white/30 font-medium">Suggested</h3>
                  <Link to="#find" className="text-[10px] text-amber/60 hover:text-amber">Find People</Link>
                </div>
                <div className="space-y-3">
                  {mock.suggestions.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/40 font-bold shrink-0">{s.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-white/60 truncate">{s.name}</p>
                        <div className="flex items-center gap-1 text-[9px] text-white/20">
                          <Fire size={9} className="text-amber" weight="fill" /> {s.streak} day streak
                        </div>
                      </div>
                      <button className="text-[10px] border border-white/10 text-white/30 hover:text-amber hover:border-amber/30 px-2.5 py-0.5 rounded-full transition-colors shrink-0">View</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <Link to="/courses" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-amber text-[#1F1822] px-5 py-3 rounded-full font-semibold text-sm shadow-lg shadow-amber/20 hover:shadow-amber/30 hover:bg-amber/90 transition-all">
        <GameController size={18} weight="fill" />
        Start Learning
        <CaretRight size={14} />
      </Link>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1F1822]/95 backdrop-blur-lg border-t border-white/[0.06] z-50 flex justify-around py-2 px-2">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.label} to={item.to}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-white/25 hover:text-amber transition-colors">
            <item.icon size={16} />
            <span className="text-[8px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
