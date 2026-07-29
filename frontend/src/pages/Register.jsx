import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    const init = async () => {
      try {
        const THREE = await import('three');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(400, 400);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geo = new THREE.TorusGeometry(1.2, 0.4, 16, 32);
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#E08E79'), wireframe: true, transparent: true, opacity: 0.3 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        camera.position.z = 4;
        const animate = () => { requestAnimationFrame(animate); mesh.rotation.x += 0.01; mesh.rotation.y += 0.008; renderer.render(scene, camera); };
        animate();
        cleanup = () => { renderer.dispose(); scene.clear(); };
      } catch { /* */ }
    };
    init();
    return cleanup;
  }, []);

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

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <canvas ref={canvasRef} width="400" height="400" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#ECE5CE]">Create account</h1>
          <p className="text-[#ECE5CE]/50 mt-1">Start learning in minutes.</p>
        </div>

        <form onSubmit={submit} className="card p-6 md:p-8 space-y-4">
          {[
            { id: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { id: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
            { id: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: 'Repeat password' },
          ].map((f) => (
            <div key={f.id}>
              <label className="block text-sm font-medium text-[#ECE5CE]/70 mb-1.5">{f.label}</label>
              <input className="input" type={f.type} placeholder={f.placeholder} value={form[f.id]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} required minLength={f.id === 'password' || f.id === 'confirmPassword' ? 6 : undefined} />
            </div>
          ))}

          <button disabled={busy} className="btn-primary w-full py-3.5 mt-2">
            {busy ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Creating...
              </span>
            ) : 'Create account'}
          </button>

          <p className="text-center text-sm text-[#ECE5CE]/40">
            Already a member? <Link to="/login" className="text-amber hover:text-amber/80 font-medium">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
