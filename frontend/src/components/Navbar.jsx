import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMegaOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => { if (megaRef.current && !megaRef.current.contains(e.target) && !navRef.current?.contains(e.target)) setMegaOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const categories = [
    { name: 'English', icon: '🌍', slug: '/courses?category=English', desc: 'Learn English from scratch' },
    { name: 'Computer', icon: '💻', slug: '/courses?category=Computer', desc: 'Digital skills for everyone' },
    { name: 'Languages', icon: '🗣️', slug: '/courses?category=Language', desc: 'Arabic, Amharic, Korean & more' },
    { name: 'Typing', icon: '⌨️', slug: '/typing', desc: 'Master touch typing' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#322938]/90 backdrop-blur-2xl shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber to-rust opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0.5 rounded-[10px] bg-base flex items-center justify-center">
              <span className="text-xs font-bold text-amber">EA</span>
            </div>
          </div>
          <span className="font-display font-bold text-lg text-[#CFC89A]">
            Eritrea<span className="text-amber">Academy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'text-amber bg-amber/10' : 'text-[#CFC89A]/60 hover:text-[#CFC89A] hover:bg-[#CFC89A]/5'}`}>
            Home
          </NavLink>

          {/* Mega Menu Trigger */}
          <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${location.pathname.startsWith('/courses') ? 'text-amber bg-amber/10' : 'text-[#CFC89A]/60 hover:text-[#CFC89A] hover:bg-[#CFC89A]/5'}`}>
              Courses
              <svg className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {megaOpen && (
              <div
                ref={megaRef}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] rounded-2xl border border-[#CFC89A]/10 bg-[#322938]/95 backdrop-blur-2xl shadow-2xl shadow-black/30 p-5 animate-scale-in origin-top"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.slug}
                      onClick={() => setMegaOpen(false)}
                      className="flex items-start gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-[#CFC89A]/5 group/card"
                    >
                      <span className="text-2xl shrink-0">{cat.icon}</span>
                      <div>
                        <p className="font-semibold text-[#CFC89A] group-hover/card:text-amber transition-colors">{cat.name}</p>
                        <p className="text-xs text-[#CFC89A]/40 mt-0.5">{cat.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#CFC89A]/10">
                  <Link to="/courses" onClick={() => setMegaOpen(false)} className="text-sm text-amber hover:text-amber/80 font-medium flex items-center gap-1">
                    View all courses <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/typing" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'text-amber bg-amber/10' : 'text-[#CFC89A]/60 hover:text-[#CFC89A] hover:bg-[#CFC89A]/5'}`}>
            Typing
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'text-amber bg-amber/10' : 'text-[#CFC89A]/60 hover:text-[#CFC89A] hover:bg-[#CFC89A]/5'}`}>
            Dashboard
            </NavLink>
          )}

          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'text-rust bg-rust/10' : 'text-[#CFC89A]/60 hover:text-rust hover:bg-rust/5'}`}>
              Admin
            </NavLink>
          )}

          {user?.role === 'teacher' && (
            <NavLink to="/teacher" className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? 'text-sage bg-sage/10' : 'text-[#CFC89A]/60 hover:text-sage hover:bg-sage/5'}`}>
              Teacher
            </NavLink>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button onClick={toggle} className="w-9 h-9 rounded-xl bg-[#CFC89A]/5 hover:bg-[#CFC89A]/10 flex items-center justify-center text-[#CFC89A]/60 hover:text-amber transition-all" aria-label="Toggle theme">
            {dark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,101.66a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a88,88,0,0,1,123.24,123.24Z"></path></svg>
            )}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber to-rust flex items-center justify-center text-white text-xs font-bold">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <button onClick={handleLogout} className="px-3 py-2 text-sm text-[#CFC89A]/50 hover:text-rust transition-colors" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-[#CFC89A]/60 hover:text-[#CFC89A] transition-colors">Log in</Link>
              <Link to="/register" className="btn-primary py-2 px-4 text-sm !rounded-xl">Sign up</Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button className="md:hidden w-9 h-9 rounded-xl bg-[#CFC89A]/5 hover:bg-[#CFC89A]/10 flex items-center justify-center text-[#CFC89A]/60 hover:text-amber transition-all" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM216,64H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,112H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-[#CFC89A]/10 bg-[#322938]/95 backdrop-blur-2xl px-5 py-5 flex flex-col gap-1">
          <MobileLink to="/" onClick={() => setIsOpen(false)}>Home</MobileLink>
          <MobileLink to="/courses" onClick={() => setIsOpen(false)}>Courses</MobileLink>
          <MobileLink to="/typing" onClick={() => setIsOpen(false)}>Typing</MobileLink>
          {user && <MobileLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileLink>}
          {user?.role === 'admin' && <MobileLink to="/admin" onClick={() => setIsOpen(false)}>Admin Panel</MobileLink>}
          {user?.role === 'teacher' && <MobileLink to="/teacher" onClick={() => setIsOpen(false)}>Teacher Panel</MobileLink>}
          {user ? (
            <button onClick={() => { setIsOpen(false); handleLogout(); }} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-rust/80 hover:text-rust rounded-lg hover:bg-rust/5 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path></svg>
              Log out
            </button>
          ) : (
            <>
              <div className="h-px bg-[#CFC89A]/10 my-2" />
              <Link to="/login" onClick={() => setIsOpen(false)} className="btn-ghost justify-center py-2">Log in</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary justify-center py-2">Sign up</Link>
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
          isActive ? 'text-amber bg-amber/10' : 'text-[#CFC89A]/60 hover:text-[#CFC89A] hover:bg-[#CFC89A]/5'
        }`
      }
    >
      {children}
    </NavLink>
  );
}
