import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import BackLink from '../../components/BackLink';

export default function CourseForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEdit = !!slug;

  const [formData, setFormData] = useState({
    slug: '', title: '', titleTi: '', category: 'Computer', flag: '', description: '',
    price: 0, levels: 'Beginner, Intermediate, Advanced', instructionLanguages: 'English, Tigrigna',
    image: '', modules: '', focus: ''
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/api/content/courses/${slug}`).then(({ data }) => {
        const c = data.course;
        setFormData({
          ...c,
          levels: c.levels?.join(', ') || '',
          instructionLanguages: c.instructionLanguages?.join(', ') || '',
          modules: c.modules?.join(', ') || '',
          focus: c.focus?.join(', ') || ''
        });
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [slug, isEdit]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      levels: formData.levels.split(',').map(s => s.trim()).filter(Boolean),
      instructionLanguages: formData.instructionLanguages.split(',').map(s => s.trim()).filter(Boolean),
      modules: formData.modules.split(',').map(s => s.trim()).filter(Boolean),
      focus: formData.focus.split(',').map(s => s.trim()).filter(Boolean),
      price: Number(formData.price),
    };
    try {
      if (isEdit) await api.put(`/api/admin/courses/${slug}`, payload);
      else await api.post('/api/admin/courses', payload);
      toast.success(isEdit ? 'Course updated!' : 'Course created!');
      navigate('/admin/courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save course');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="pt-24 text-center"><Spinner /></div>;

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5">
        <BackLink to="/admin/courses" label="Back to Dashboard" />

        <h1 className="text-3xl font-bold mb-8" style={{ color: 'rgb(var(--color-text))' }}>
          {isEdit ? 'Edit Course' : 'New Course'}
        </h1>

        <form onSubmit={handleSubmit} className="povir-card p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title (English)" required>
              <input name="title" value={formData.title} onChange={handleChange} required className="povir-input" placeholder="e.g. Computer Skills" />
            </Field>
            <Field label="URL Slug" required>
              <input name="slug" value={formData.slug} onChange={handleChange} required disabled={isEdit} className="povir-input disabled:opacity-50" placeholder="e.g. computer-skills" />
            </Field>
            <Field label="Title (Tigrigna)">
              <input name="titleTi" value={formData.titleTi} onChange={handleChange} className="povir-input" placeholder="e.g. ኮምፒተር" />
            </Field>
            <Field label="Category" required>
              <select name="category" value={formData.category} onChange={handleChange} required className="povir-input">
                <option>English</option><option>Computer</option><option>Language</option><option>Typing</option>
              </select>
            </Field>
            <Field label="Emoji Flag">
              <input name="flag" value={formData.flag} onChange={handleChange} className="povir-input" placeholder="e.g. 💻" />
            </Field>
            <Field label="Price ($)" required>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="povir-input" />
            </Field>
          </div>

          <Field label="Description" required>
            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} required className="povir-input" />
          </Field>
          <Field label="Cover Image URL" required>
            <input name="image" value={formData.image} onChange={handleChange} required className="povir-input" placeholder="https://..." />
          </Field>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Levels (comma separated)" required>
              <input name="levels" value={formData.levels} onChange={handleChange} required className="povir-input" />
            </Field>
            <Field label="Languages (comma separated)" required>
              <input name="instructionLanguages" value={formData.instructionLanguages} onChange={handleChange} required className="povir-input" />
            </Field>
            <Field label="Focus Tags (comma separated)">
              <input name="focus" value={formData.focus} onChange={handleChange} className="povir-input" placeholder="Reading, Listening, Practice" />
            </Field>
            <Field label="Modules (comma separated)" required>
              <textarea name="modules" rows={2} value={formData.modules} onChange={handleChange} required className="povir-input" placeholder="Intro, Basics, Advanced" />
            </Field>
          </div>

          <button type="submit" disabled={saving} className="povir-btn-primary w-full py-3">
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Saving...
              </span>
            ) : (
              <>{isEdit ? 'Save Changes' : 'Create Course'}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, required }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>
      {label} {required && <span style={{ color: 'rgb(var(--color-destructive))' }}>*</span>}
      {children}
    </label>
  );
}
