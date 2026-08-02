import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import api from '../api/client';

const sidebarLinks = [
  { icon: '🏠', label: 'Home', to: '/dashboard' },
  { icon: '📊', label: 'Stats', to: '/dashboard?tab=stats' },
  { icon: '📚', label: 'Courses', to: '/courses' },
  { icon: '⌨️', label: 'Typing', to: '/typing' },
  { icon: '⚙️', label: 'Settings', to: '/settings' },
];

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const avatarRef = useRef(null);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error('Avatar must be under 2MB');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const { data } = await api.put('/api/auth/upload', { type: 'avatar', data: ev.target.result });
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Avatar updated');
      } catch { toast.error('Upload failed'); }
    };
    reader.readAsDataURL(file);
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const isActive = (to) => {
    if (to.includes('?')) return location.pathname + location.search === to;
    return location.pathname === to;
  };

  return (
    <div className="flex min-h-screen" style={{ background: 'rgb(var(--color-bg))' }}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 z-50 h-screen w-[260px] shrink-0 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ background: 'rgb(var(--color-sidebar))', borderRight: '1px solid rgba(var(--color-border), 0.6)' }}>
        <div className="flex items-center justify-between px-5 h-14 shrink-0" style={{ borderBottom: '1px solid rgba(var(--color-border), 0.6)' }}>
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgb(var(--color-primary))', color: 'rgb(var(--color-primary-text))' }}>EA</div>
            <span className="text-sm font-semibold" style={{ color: 'rgb(var(--color-text))' }}>Academy</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden w-7 h-7 rounded-md flex items-center justify-center" style={{ color: 'rgb(var(--color-text-muted))' }}>
            <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/></svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'text-[rgb(var(--color-primary))] bg-[rgba(var(--color-primary),0.1)]'
                    : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgba(var(--color-text),0.05)]'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 space-y-2" style={{ borderTop: '1px solid rgba(var(--color-border), 0.6)' }}>
          <button onClick={toggle} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ color: 'rgb(var(--color-text-secondary))' }}>
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,101.66a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a88,88,0,0,1,123.24,123.24Z"/></svg>
            )}
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden" style={{ background: 'rgb(var(--color-surface))', color: 'rgb(var(--color-text))' }}>
              {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'rgb(var(--color-text))' }}>{user?.name || 'User'}</p>
              <p className="text-[10px] truncate" style={{ color: 'rgb(var(--color-text-muted))' }}>{user?.email || ''}</p>
            </div>
          </div>

          <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ color: 'rgb(var(--color-text-muted))' }}>
            <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"/></svg>
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 lg:px-6 shrink-0" style={{ background: 'rgba(var(--color-bg), 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(var(--color-border), 0.6)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: 'rgb(var(--color-text-muted))' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast('No new notifications')} className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>
              <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M221.8,175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80,80,0,0,0-160,0c0,35.33-8.25,62.38-13.8,71.94A16,16,0,0,0,48,200H72.11a56,56,0,0,0,111.78,0H208a16,16,0,0,0,13.8-24.06ZM128,216a40,40,0,0,1-37.54-25.94A8.09,8.09,0,0,1,92,184h72a8.09,8.09,0,0,1,1.54,6.06A40,40,0,0,1,128,216Z"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'rgb(var(--color-primary))' }} />
            </button>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold overflow-hidden cursor-pointer" style={{ background: 'rgb(var(--color-surface))', color: 'rgb(var(--color-text))' }} onClick={() => avatarRef.current?.click()}>
              {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : initials}
            </div>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
