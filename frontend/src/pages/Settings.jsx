import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword && form.newPassword !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.newPassword && form.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await api.put('/api/auth/settings', {
        name: form.name !== user?.name ? form.name : undefined,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined,
      });
      await refreshUser();
      setForm({ ...form, currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Settings saved');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally { setLoading(false); }
  };

  const label = 'text-xs text-[#CFC89A]/60 mb-1 block';
  const input = 'w-full bg-[#322938] border border-[#CFC89A]/10 rounded-lg px-3 py-2 text-[#CFC89A] text-sm focus:outline-none focus:border-amber/40 transition-colors';

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-xl px-5">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-[#CFC89A]">Settings</h1>
          <p className="text-[#CFC89A]/40 text-sm mt-1">Update your profile and password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#CFC89A]">Profile</h2>
            <div>
              <label className={label}>Name</label>
              <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className={label}>Email</label>
              <input className={input} value={user?.email || ''} disabled readOnly />
              <p className="text-[10px] text-[#CFC89A]/20 mt-1">Email cannot be changed.</p>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h2 className="text-sm font-semibold text-[#CFC89A]">Change Password</h2>
            <p className="text-[10px] text-[#CFC89A]/30 -mt-2">Leave blank to keep current password.</p>
            <div>
              <label className={label}>Current Password</label>
              <input type="password" className={input} value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} autoComplete="current-password" />
            </div>
            <div>
              <label className={label}>New Password</label>
              <input type="password" className={input} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} autoComplete="new-password" />
            </div>
            <div>
              <label className={label}>Confirm New Password</label>
              <input type="password" className={input} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} autoComplete="new-password" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
