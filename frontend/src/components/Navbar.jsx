import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-sand/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
          <img src="/favicon.png" alt="" className="h-9 w-9 rounded-xl" />
          Eritrea <span className="text-teal">Learn</span>
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/courses" className={({ isActive }) => `hidden text-sm font-semibold sm:block ${isActive ? 'text-teal' : 'text-ink/70 hover:text-teal'}`}>Courses</NavLink>
          <NavLink to="/typing" className={({ isActive }) => `hidden text-sm font-semibold sm:block ${isActive ? 'text-teal' : 'text-ink/70 hover:text-teal'}`}>Typing</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className="text-sm font-semibold text-ink/70 hover:text-teal">My Learning</NavLink>
              <button onClick={() => { logout(); navigate('/'); }} className="text-ink/50 hover:text-ink" aria-label="Log out"><LogOut size={18} /></button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-ink/70 hover:text-teal">Log in</Link>
              <Link to="/register" className="btn-primary py-2">Sign up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
