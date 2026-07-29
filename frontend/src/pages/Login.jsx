import { useState, useEffect, useRef } from 'react';
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

        const geo = new THREE.IcosahedronGeometry(1.5, 0);
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#E08E79'), wireframe: true, transparent: true, opacity: 0.3 });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        camera.position.z = 4;
        const animate = () => { requestAnimationFrame(animate); mesh.rotation.x += 0.005; mesh.rotation.y += 0.01; renderer.render(scene, camera); };
        animate();
        cleanup = () => { renderer.dispose(); scene.clear(); };
      } catch { /* */ }
    };
    init();
    return cleanup;
  }, []);

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
          <canvas ref={canvasRef} width="400" height="400" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Welcome back</h1>
          <p className="text-foreground/50 mt-1">Continue your learning journey.</p>
        </div>

        <form onSubmit={submit} className="card p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1.5">Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground/70">Password</label>
              <button type="button" onClick={() => toast('Password reset coming soon')} className="text-xs text-amber/60 hover:text-amber transition-colors">Forgot password?</button>
            </div>
            <input className="input" type="password" placeholder="Your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>

          <button disabled={busy} className="btn-primary w-full py-3.5">
            {busy ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>

          <div className="text-center">
            <p className="text-sm text-foreground/40">
              New here? <Link to="/register" className="text-amber hover:text-amber/80 font-medium">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
