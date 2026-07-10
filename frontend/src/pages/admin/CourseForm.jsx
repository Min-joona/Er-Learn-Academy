import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import { ArrowLeft, Save } from 'lucide-react';

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
      });
    }
  }, [slug, isEdit]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      levels: formData.levels.split(',').map(s => s.trim()).filter(Boolean),
      instructionLanguages: formData.instructionLanguages.split(',').map(s => s.trim()).filter(Boolean),
      modules: formData.modules.split(',').map(s => s.trim()).filter(Boolean),
      focus: formData.focus.split(',').map(s => s.trim()).filter(Boolean)
    };
    try {
      if (isEdit) {
        await api.put(`/api/admin/courses/${slug}`, payload);
      } else {
        await api.post('/api/admin/courses', payload);
      }
      navigate('/admin/courses');
    } catch (err) {
      console.error(err);
      alert('Failed to save course. Check console.');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading form...</div>;

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Link to="/admin/courses" className="inline-flex items-center gap-2 text-ink/60 hover:text-teal mb-6 font-semibold">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>
      
      <h1 className="text-3xl font-display font-extrabold text-ink mb-8">
        {isEdit ? 'Edit Course' : 'Create New Course'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-ink/10 flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Title (English) <input required name="title" value={formData.title} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" placeholder="e.g. Computer Skills" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            URL Slug <input required disabled={isEdit} name="slug" value={formData.slug} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal disabled:bg-sand" placeholder="e.g. computer-skills" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Title (Tigrigna) <input name="titleTi" value={formData.titleTi} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" placeholder="e.g. ኮምፒተር" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Category
            <select required name="category" value={formData.category} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal">
              <option>English</option><option>Computer</option><option>Language</option><option>Typing</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Emoji Flag <input name="flag" value={formData.flag} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" placeholder="e.g. 💻" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Price ($) <input type="number" required name="price" value={formData.price} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          Description <textarea required name="description" rows={3} value={formData.description} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
        </label>
        
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          Cover Image URL <input required name="image" value={formData.image} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
        </label>

        <div className="grid sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Levels (comma separated) <input required name="levels" value={formData.levels} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Languages (comma separated) <input required name="instructionLanguages" value={formData.instructionLanguages} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
            Focus Tags (comma separated) <input name="focus" value={formData.focus} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" placeholder="e.g. Reading, Practice" />
          </label>
        </div>
        
        <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
          Modules Outline (comma separated) <textarea required name="modules" rows={3} value={formData.modules} onChange={handleChange} className="border border-ink/20 rounded-lg p-2 font-normal" placeholder="e.g. Intro to computers, Files & folders" />
        </label>

        <button type="submit" className="btn-primary flex items-center justify-center gap-2 mt-4 py-3">
          <Save size={18} /> {isEdit ? 'Save Changes' : 'Create Course'}
        </button>
      </form>
    </div>
  );
}
