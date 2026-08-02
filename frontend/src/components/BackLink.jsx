import { Link } from 'react-router-dom';

export default function BackLink({ to, label = 'Back', muted = true }) {
  const base = muted ? 'rgba(var(--color-text-muted), 0.7)' : 'rgba(var(--color-text-muted), 0.6)';
  const hover = muted ? 'rgb(var(--color-primary))' : 'rgb(var(--color-text))';
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
      style={{ color: base }}
      onMouseEnter={(e) => (e.currentTarget.style.color = hover)}
      onMouseLeave={(e) => (e.currentTarget.style.color = base)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" /></svg>
      {label}
    </Link>
  );
}
