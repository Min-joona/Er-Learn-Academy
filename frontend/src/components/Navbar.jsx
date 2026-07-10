import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-sand/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold" onClick={() => setIsOpen(false)}>
          <img src="/favicon.png" alt="" className="h-9 w-9 rounded-xl" />
          Eritrea <span className="text-teal">Learn</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/courses" className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-teal' : 'text-ink/70 hover:text-teal'}`}>Courses</NavLink>
          <NavLink to="/typing" className={({ isActive }) => `text-sm font-semibold ${isActive ? 'text-teal' : 'text-ink/70 hover:text-teal'}`}>Typing</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className="text-sm font-semibold text-ink/70 hover:text-teal">My Learning</NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" className="text-sm font-semibold text-purple-600 hover:text-purple-800">Admin Panel</NavLink>
              )}
              <button onClick={() => { logout(); navigate('/'); }} className="text-ink/50 hover:text-ink" aria-label="Log out"><LogOut size={18} /></button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-ink/70 hover:text-teal">Log in</Link>
              <Link to="/register" className="btn-primary py-2">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ink/70 p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b border-ink/5 bg-white px-5 py-5 flex flex-col gap-4 shadow-xl absolute w-full left-0">
          <NavLink to="/courses" onClick={() => setIsOpen(false)} className={({ isActive }) => `text-base font-semibold ${isActive ? 'text-teal' : 'text-ink/80'}`}>Courses</NavLink>
          <NavLink to="/typing" onClick={() => setIsOpen(false)} className={({ isActive }) => `text-base font-semibold ${isActive ? 'text-teal' : 'text-ink/80'}`}>Typing</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="text-base font-semibold text-ink/80">My Learning</NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" onClick={() => setIsOpen(false)} className="text-base font-semibold text-purple-600">Admin Panel</NavLink>
              )}
              <button onClick={() => { setIsOpen(false); logout(); navigate('/'); }} className="text-left text-base font-semibold text-red-500">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-base font-semibold text-ink/80">Log in</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary py-2 w-full text-center">Sign up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
