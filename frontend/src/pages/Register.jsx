import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { await register(form); toast.success('Account created!'); navigate('/courses'); }
    catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
    finally { setBusy(false); }
  };

  return (
    <div className="grid min-h-[80vh] place-items-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-extrabold">Create your account</h1>
        <p className="mt-1 text-ink/60">Start learning in minutes.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password (min 6)" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button disabled={busy} className="btn-primary w-full">{busy ? 'Creating…' : 'Sign up'}</button>
        </form>
        <p className="mt-4 text-sm">Already a member? <Link to="/login" className="font-semibold text-teal">Log in</Link></p>
      </div>
    </div>
  );
}
