import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/client';

export default function Settings() {
  const { user } = useAuth();
  const avatarRef = useRef(null);
  const coverRef = useRef(null);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    password: '',
    newPassword: '',
  });
  const [saving, setSaving] = useState(false);

  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error('File must be under 2MB');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const { data } = await api.put('/api/auth/upload', { type, data: ev.target.result });
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(`${type === 'avatar' ? 'Avatar' : 'Cover'} updated`);
        window.location.reload();
      } catch { toast.error('Upload failed'); }
    };
    reader.readAsDataURL(file);
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/api/auth/settings', {
        name: form.name, bio: form.bio, location: form.location,
        website: form.website, password: form.password, newPassword: form.newPassword,
      });
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Settings saved');
      setForm((f) => ({ ...f, password: '', newPassword: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="povir-card overflow-hidden">
        <div className="relative h-24 lg:h-32 group cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(var(--color-primary), 0.15), rgba(var(--color-accent-purple), 0.1))' }} onClick={() => coverRef.current?.click()}>
          {user?.coverImage && <img src={user.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <svg width="20" height="20" viewBox="0 0 256 256" fill="white"><path d="M209.67,87H178.66V56a8,8,0,0,0-8-8H85.34a8,8,0,0,0-8,8V87H46.33a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H209.67a8,8,0,0,0,8-8V95A8,8,0,0,0,209.67,87ZM93.34,64h69.32V87H93.34ZM201.67,192H54.33V103H201.67Z"/></svg>
          </div>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'coverImage')} />
        </div>
        <div className="px-5 pb-5">
          <div className="flex items-center gap-4 -mt-10">
            <div className="relative w-[72px] h-[72px] rounded-2xl border-2 overflow-hidden group cursor-pointer" style={{ borderColor: 'rgb(var(--color-card))', background: 'rgb(var(--color-surface))' }} onClick={() => avatarRef.current?.click()}>
              {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{initials}</div>}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 256 256" fill="white"><path d="M209.67,87H178.66V56a8,8,0,0,0-8-8H85.34a8,8,0,0,0-8,8V87H46.33a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H209.67a8,8,0,0,0,8-8V95A8,8,0,0,0,209.67,87ZM93.34,64h69.32V87H93.34ZM201.67,192H54.33V103H201.67Z"/></svg>
              </div>
            </div>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'avatar')} />
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--color-text))' }}>{user?.name || 'User'}</h2>
              <p className="text-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>{user?.email || ''}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="povir-card p-5 space-y-4">
        <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--color-text))' }}>Profile Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Name</label>
            <input className="povir-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Email</label>
            <input className="povir-input" value={form.email} disabled style={{ opacity: 0.6 }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Bio</label>
          <textarea className="povir-input min-h-[80px] resize-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell us about yourself..." />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Location</label>
            <input className="povir-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, Country" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Website</label>
            <input className="povir-input" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://" />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="povir-card p-5 space-y-4">
        <h3 className="text-sm font-semibold" style={{ color: 'rgb(var(--color-text))' }}>Change Password</h3>
        <p className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>Leave blank to keep your current password.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>Current Password</label>
            <input className="povir-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Current password" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(var(--color-text-secondary), 0.8)' }}>New Password</label>
            <input className="povir-input" type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} placeholder="New password" />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={saveSettings} disabled={saving} className="povir-btn-primary px-8 py-3">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
