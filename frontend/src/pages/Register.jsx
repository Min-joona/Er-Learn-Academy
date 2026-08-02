import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setBusy(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      toast.success('Account created!');
      navigate('/courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  const fields = [
    { id: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { id: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
    { id: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: 'Repeat password' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: 'rgba(var(--color-primary), 0.1)' }}>
            <span style={{ color: 'rgb(var(--color-primary))' }}>🚀</span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Create account</h1>
          <p className="mt-1" style={{ color: 'rgb(var(--color-text-secondary))' }}>Start learning in minutes.</p>
        </div>

        <form onSubmit={submit} className="povir-card p-6 md:p-8 space-y-4">
          {fields.map((f) => (
            <div key={f.id}>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>{f.label}</label>
              <input className="povir-input" type={f.type} placeholder={f.placeholder} value={form[f.id]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} required minLength={f.id === 'password' || f.id === 'confirmPassword' ? 6 : undefined} />
            </div>
          ))}

          <button disabled={busy} className="povir-btn-primary w-full py-3.5 mt-2">
            {busy ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Creating...
              </span>
            ) : 'Create account'}
          </button>

          <p className="text-center text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>
            Already a member? <Link to="/login" className="font-semibold" style={{ color: 'rgb(var(--color-primary))' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
