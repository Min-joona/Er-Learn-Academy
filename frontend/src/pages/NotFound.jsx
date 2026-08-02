import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'rgb(var(--color-text))' }}>Page not found</h1>
        <p className="mb-6" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="povir-btn-primary py-3 px-6">Go home</Link>
      </div>
    </div>
  );
}
