import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import toast from 'react-hot-toast';

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

  if (loading) return <div className="pt-24 text-center"><div className="relative w-8 h-8 mx-auto"><div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" /><div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" /></div></div>;

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-5">
        <Link to="/admin/courses" className="inline-flex items-center gap-2 text-sm text-[#CFC89A]/50 hover:text-amber mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-display font-bold text-[#CFC89A] mb-8">
          {isEdit ? 'Edit Course' : 'New Course'}
        </h1>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title (English)" required>
              <input name="title" value={formData.title} onChange={handleChange} required className="input" placeholder="e.g. Computer Skills" />
            </Field>
            <Field label="URL Slug" required>
              <input name="slug" value={formData.slug} onChange={handleChange} required disabled={isEdit} className="input disabled:opacity-50" placeholder="e.g. computer-skills" />
            </Field>
            <Field label="Title (Tigrigna)">
              <input name="titleTi" value={formData.titleTi} onChange={handleChange} className="input" placeholder="e.g. ኮምፒተር" />
            </Field>
            <Field label="Category" required>
              <select name="category" value={formData.category} onChange={handleChange} required className="input">
                <option>English</option><option>Computer</option><option>Language</option><option>Typing</option>
              </select>
            </Field>
            <Field label="Emoji Flag">
              <input name="flag" value={formData.flag} onChange={handleChange} className="input" placeholder="e.g. 💻" />
            </Field>
            <Field label="Price ($)" required>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="input" />
            </Field>
          </div>

          <Field label="Description" required>
            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} required className="input" />
          </Field>
          <Field label="Cover Image URL" required>
            <input name="image" value={formData.image} onChange={handleChange} required className="input" placeholder="https://..." />
          </Field>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Levels (comma separated)" required>
              <input name="levels" value={formData.levels} onChange={handleChange} required className="input" />
            </Field>
            <Field label="Languages (comma separated)" required>
              <input name="instructionLanguages" value={formData.instructionLanguages} onChange={handleChange} required className="input" />
            </Field>
            <Field label="Focus Tags (comma separated)">
              <input name="focus" value={formData.focus} onChange={handleChange} className="input" placeholder="Reading, Listening, Practice" />
            </Field>
            <Field label="Modules (comma separated)" required>
              <textarea name="modules" rows={2} value={formData.modules} onChange={handleChange} required className="input" placeholder="Intro, Basics, Advanced" />
            </Field>
          </div>

          <button type="submit" disabled={saving} className="btn-primary w-full py-3">
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
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[#CFC89A]/70">
      {label} {required && <span className="text-rust">*</span>}
      {children}
    </label>
  );
}
