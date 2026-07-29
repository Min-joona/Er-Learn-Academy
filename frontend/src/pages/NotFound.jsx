import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-display font-bold text-[#ECE5CE] mb-2">Page not found</h1>
        <p className="text-[#ECE5CE]/50 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary py-3 px-6">Go home</Link>
      </div>
    </div>
  );
}
