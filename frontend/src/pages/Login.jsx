import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: 'rgba(var(--color-primary), 0.1)' }}>
            <span style={{ color: 'rgb(var(--color-primary))' }}>🔐</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Welcome back</h1>
          <p className="mt-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>Continue your learning journey.</p>
        </div>

        <form onSubmit={submit} className="povir-card p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Email</label>
            <input className="povir-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Password</label>
              <button type="button" onClick={() => toast('Password reset coming soon')} className="text-xs font-medium transition-colors" style={{ color: 'rgb(var(--color-primary))' }}>Forgot password?</button>
            </div>
            <input className="povir-input" type="password" placeholder="Your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>

          <button disabled={busy} className="povir-btn-primary w-full py-3.5">
            {busy ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>

          <div className="text-center">
            <p className="text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>
              New here? <Link to="/register" className="font-semibold" style={{ color: 'rgb(var(--color-primary))' }}>Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
