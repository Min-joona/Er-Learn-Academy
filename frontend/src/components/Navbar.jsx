import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-[rgb(var(--color-primary))] bg-[rgba(var(--color-primary),0.1)]'
        : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgba(var(--color-text),0.05)]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(var(--color-bg),0.85)] backdrop-blur-2xl shadow-lg shadow-[rgba(0,0,0,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-[rgb(var(--color-primary))] opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0.5 rounded-[10px] flex items-center justify-center" style={{ background: 'rgb(var(--color-bg))' }}>
              <span className="text-xs font-bold" style={{ color: 'rgb(var(--color-primary))' }}>EA</span>
            </div>
          </div>
          <span className="font-bold text-lg" style={{ color: 'rgb(var(--color-text))' }}>
            Eritrea<span style={{ color: 'rgb(var(--color-primary))' }}>Academy</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>
          <NavLink to="/typing" className={linkClass}>Typing</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <NavLink to={user?.role === 'admin' ? '/admin' : '/teacher'} className={linkClass}>
              {user?.role === 'admin' ? 'Admin' : 'Teacher'}
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ background: 'rgba(var(--color-text),0.05)', color: 'rgb(var(--color-text-secondary))' }} aria-label="Toggle theme">
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,101.66a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a88,88,0,0,1,123.24,123.24Z"></path></svg>
            )}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'rgb(var(--color-primary))', color: 'rgb(var(--color-primary-text))' }}>
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <Link to="/settings" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }} title="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M232,117.87v20.26a8,8,0,0,1-5.69,7.65l-18.29,5.47a86.45,86.45,0,0,1-9.42,15.91l6.79,19.33a8,8,0,0,1-2.88,9l-14.32,11.14a8,8,0,0,1-9.29.6l-16.89-10.12a86.27,86.27,0,0,1-18.42,0L127.1,207.07a8,8,0,0,1-9.29-.6l-14.32-11.14a8,8,0,0,1-2.88-9l6.79-19.33a86.45,86.45,0,0,1-9.42-15.91l-18.29-5.47A8,8,0,0,1,74,138.13V117.87a8,8,0,0,1,5.69-7.65l18.29-5.47a86.45,86.45,0,0,1,9.42-15.91l-6.79-19.33a8,8,0,0,1,2.88-9l14.32-11.14a8,8,0,0,1,9.29-.6l16.89,10.12a86.27,86.27,0,0,1,18.42,0l16.89-10.12a8,8,0,0,1,9.29.6l14.32,11.14a8,8,0,0,1,2.88,9l-6.79,19.33a86.45,86.45,0,0,1,9.42,15.91l18.29,5.47A8,8,0,0,1,232,117.87ZM128,164a36,36,0,1,0-36-36A36,36,0,0,0,128,164Z"></path></svg>
              </Link>
              <button onClick={handleLogout} className="px-3 py-2 text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }} title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium transition-colors" style={{ color: 'rgb(var(--color-text-secondary))' }}>Log in</Link>
              <Link to="/register" className="povir-btn-primary py-2 px-4 text-sm">Sign up</Link>
            </div>
          )}

          <button className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ background: 'rgba(var(--color-text),0.05)', color: 'rgb(var(--color-text-secondary))' }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM216,64H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,112H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
            )}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t px-5 py-5 flex flex-col gap-1" style={{ borderColor: 'rgba(var(--color-border),0.6)', background: 'rgba(var(--color-bg),0.95)' }}>
          <MobileLink to="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
          <MobileLink to="/courses" onClick={() => setIsOpen(false)}>Courses</MobileLink>
          <MobileLink to="/typing" onClick={() => setIsOpen(false)}>Typing</MobileLink>
          {user && <MobileLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileLink>}
          {user && <MobileLink to="/settings" onClick={() => setIsOpen(false)}>Settings</MobileLink>}
          {user?.role === 'admin' && <MobileLink to="/admin" onClick={() => setIsOpen(false)}>Admin</MobileLink>}
          {user?.role === 'teacher' && <MobileLink to="/teacher" onClick={() => setIsOpen(false)}>Teacher</MobileLink>}
          {user ? (
            <button onClick={() => { setIsOpen(false); handleLogout(); }} className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors" style={{ color: 'rgb(var(--color-destructive))' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>
              Log out
            </button>
          ) : (
            <>
              <div className="h-px my-2" style={{ background: 'rgba(var(--color-border),0.6)' }} />
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-colors" style={{ color: 'rgb(var(--color-text-secondary))' }}>Log in</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="povir-btn-primary justify-center py-3">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'text-[rgb(var(--color-primary))] bg-[rgba(var(--color-primary),0.1)]'
            : 'text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgba(var(--color-text),0.05)]'
        }`
      }
    >
      {children}
    </NavLink>
  );
}
