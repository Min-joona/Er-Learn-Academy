import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Courses', value: 8, suffix: '+' },
  { label: 'Languages', value: 6, suffix: '' },
  { label: 'Students', value: 500, suffix: '+' },
  { label: 'Lessons', value: 200, suffix: '+' },
];

const features = [
  { icon: '📖', title: 'Interactive Lessons', desc: 'Bite-sized lessons with reading, listening, and practice exercises tailored to your level.' },
  { icon: '🧠', title: 'Smart Placement', desc: 'Take a quick test and we\'ll place you at exactly the right level — no time wasted on what you already know.' },
  { icon: '🎯', title: 'Typing Mastery', desc: 'Built-in typing trainer with real-time WPM, accuracy tracking, and drills from beginner to pro.' },
  { icon: '🏆', title: 'Progress Tracking', desc: 'Track your completion, earn achievements, and watch your skills grow with detailed analytics.' },
  { icon: '🌍', title: 'Multilingual', desc: 'Learn in Tigrigna, English, or Arabic. Our platform speaks your language.' },
  { icon: '📊', title: 'Quizzes & Exams', desc: 'Test your knowledge with quizzes, flashcards, and comprehensive exams at every level.' },
];

const testimonials = [
  { name: 'Amanuel G.', role: 'English Student', text: 'The placement test was spot-on. I started at Intermediate and within weeks I could feel my English improving. The Tigrigna instructions made everything so clear.', avatar: 'AG' },
  { name: 'Selam K.', role: 'Computer Skills', text: 'I was scared of computers before. Now I can use spreadsheets, organize files, and I even built my first presentation. This academy changed my life.', avatar: 'SK' },
  { name: 'Yonas M.', role: 'Arabic Learner', text: 'The listening exercises with the audio playback are amazing. I practice the pronunciation over and over until it sounds right.', avatar: 'YM' },
];

function useIntersection(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options]);
  return isVisible;
}

function AnimatedCounter({ value, suffix, isVisible }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!isVisible || !ref.current) return;
    let animeMod;
    import('animejs').then((m) => {
      animeMod = m.default;
      const obj = { val: 0 };
      animeMod({
        targets: obj,
        val: value,
        duration: 2000,
        easing: 'easeOutCubic',
        round: 1,
        update: () => { if (ref.current) ref.current.textContent = obj.val.toLocaleString() + suffix; },
      });
    });
  }, [isVisible, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function AnimatedSection({ children, className, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  useEffect(() => {
    if (!visible || !ref.current) return;
    import('animejs').then((m) => {
      const offset = direction === 'up' ? 60 : direction === 'down' ? -60 : direction === 'left' ? 60 : -60;
      const axis = direction === 'left' || direction === 'right' ? 'translateX' : 'translateY';
      m.default({
        targets: ref.current.children.length ? ref.current.children : ref.current,
        opacity: [0, 1],
        [axis]: [offset, 0],
        duration: 800,
        delay: m.default.stagger(100, { start: delay }),
        easing: 'easeOutCubic',
      });
    });
  }, [visible, delay, direction]);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {visible ? children : null}
    </div>
  );
}

export default function Landing() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const charsRef = useRef(null);
  const statsSectionRef = useRef(null);
  const statsVisible = useIntersection(statsSectionRef);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    import('../api/client').then(({ default: api }) =>
      api.get('/api/content/courses').then(({ data }) => setCourses(data)).catch(() => {})
    );
  }, []);

  useEffect(() => {
    let cleanup = () => {};
    const initBg = async () => {
      try {
        const THREE = await import('three');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particlesGeo = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 50;
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({
          size: 0.05,
          color: new THREE.Color('#E08E79'),
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        const linesMat = new THREE.LineBasicMaterial({ color: new THREE.Color('#E08E79'), transparent: true, opacity: 0.05 });

        camera.position.z = 15;

        let mouseX = 0, mouseY = 0;
        const handleMouse = (e) => { mouseX = (e.clientX / window.innerWidth) * 2 - 1; mouseY = -(e.clientY / window.innerHeight) * 2 + 1; };
        window.addEventListener('mousemove', handleMouse);

        const handleResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
        window.addEventListener('resize', handleResize);

        let time = 0;
        const animate = () => {
          requestAnimationFrame(animate);
          time += 0.002;
          particles.rotation.x += 0.0003;
          particles.rotation.y += 0.0005;
          particles.rotation.z = Math.sin(time * 0.2) * 0.1;
          camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
          camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
        };
        animate();

        cleanup = () => {
          window.removeEventListener('mousemove', handleMouse);
          window.removeEventListener('resize', handleResize);
          renderer.dispose();
          scene.clear();
        };
      } catch { }
    };
    initBg();
    return cleanup;
  }, []);

  useEffect(() => {
    let animeMod;
    import('animejs').then((m) => {
      animeMod = m.default;
      const tl = animeMod.timeline({ easing: 'easeOutCubic' });
      tl.add({
        targets: '.hero-title .char',
        translateY: [80, 0],
        opacity: [0, 1],
        duration: 600,
        delay: animeMod.stagger(30, { start: 400 }),
      })
      .add({
        targets: '.hero-sub',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
      }, '-=300')
      .add({
        targets: '.hero-cta > *',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400,
        delay: animeMod.stagger(80),
      }, '-=200')
      .add({
        targets: '.hero-stats > *',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
        delay: animeMod.stagger(80),
      }, '-=200');
    });
  }, []);

  const heroText = "Learn without limits — in your language.";
  const chars = heroText.split('');

  return (
    <div>
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-base/60 via-transparent to-base/80 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber/20 bg-amber/5 text-amber text-xs font-medium mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
              Empowering Eritrean learners worldwide
            </div>

            <h1 className="hero-title font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
              {chars.map((ch, i) => (
                <span key={i} className="char inline-block" style={ch === ' ' ? { width: '0.3em' } : {}}>
                  {ch === ' ' ? '\u00A0' : <span className="gradient-text">{ch}</span>}
                </span>
              ))}
            </h1>

            <p className="hero-sub mt-6 text-lg md:text-xl text-[#ECE5CE]/60 max-w-xl leading-relaxed">
              Master English, computer skills, and world languages with lessons taught in <strong className="text-[#ECE5CE]">Tigrigna</strong>, <strong className="text-[#ECE5CE]">English</strong>, or <strong className="text-[#ECE5CE]">Arabic</strong>.
            </p>

            <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/courses" className="btn-primary text-base px-8 py-4">
                Explore courses
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
              </Link>
              <Link to="/typing" className="btn-outline text-base px-8 py-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,80H176V56a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-64,0H112V64h32ZM48,96H208v16H48ZM48,208V128H208v80Z"></path></svg>
                Try typing free
              </Link>
            </div>

            <div className="hero-stats mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="stat-number text-2xl md:text-3xl font-bold text-amber">
                    <AnimatedCounter value={s.value} suffix={s.suffix} isVisible={true} />
                  </span>
                  <span className="text-xs text-[#ECE5CE]/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={statsSectionRef} className="py-16 md:py-20 border-y border-[#ECE5CE]/5">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Courses', value: 8, icon: '📚' },
              { label: 'Languages Taught', value: 6, icon: '🌍' },
              { label: 'Students Enrolled', value: 500, icon: '👨‍🎓' },
              { label: 'Interactive Lessons', value: 200, icon: '📝' },
            ].map((s) => (
              <div key={s.label} className="text-center group">
                <span className="text-3xl md:text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
                <div className="text-3xl md:text-4xl font-bold text-amber tabular-nums">
                  <AnimatedCounter value={s.value} suffix="" isVisible={statsVisible} />
                </div>
                <div className="text-sm text-[#ECE5CE]/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title">Everything you need to learn</h2>
            <p className="section-sub mx-auto">A complete learning experience designed for Eritrean students, by Eritrean educators.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <AnimatedSection key={f.title} className="card-hover p-6 md:p-8 group">
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                <h3 className="font-display font-bold text-lg text-[#ECE5CE] mb-2">{f.title}</h3>
                <p className="text-sm text-[#ECE5CE]/50 leading-relaxed">{f.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#774F38]/30">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Our courses</h2>
              <p className="section-sub">Pick your path and start learning today.</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-sm font-medium text-amber hover:text-amber/80 transition-colors">
              View all <span>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 6).map((c, i) => (
              <Link key={c.slug} to={`/courses/${c.slug}`} className="course-card-landing card-hover group overflow-hidden p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#774F38] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{c.flag}</span>
                  <span className="absolute top-3 right-3 pill-amber text-xs">{c.price === 0 ? 'Free' : `$${c.price}`}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-[#ECE5CE] group-hover:text-amber transition-colors">{c.title}</h3>
                  <p className="text-sm text-[#ECE5CE]/50 mt-1 line-clamp-2">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(c.focus || []).slice(0, 3).map((f) => (
                      <span key={f} className="pill bg-amber/10 text-amber text-[10px]">{f}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-16 text-[#ECE5CE]/30">
              <p>Courses loading...</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/courses" className="btn-outline">View all courses</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-12">
            <h2 className="section-title">What our students say</h2>
            <p className="section-sub mx-auto">Real stories from real learners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card card-hover p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber to-rust flex items-center justify-center text-white text-sm font-bold">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm text-[#ECE5CE]">{t.name}</p>
                    <p className="text-xs text-[#ECE5CE]/40">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#ECE5CE]/60 leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="text-amber"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path></svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber/5 via-rust/5 to-amber/5" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="section-title text-3xl md:text-5xl">Ready to start learning?</h2>
          <p className="text-[#ECE5CE]/50 mt-4 text-lg max-w-xl mx-auto">Join hundreds of Eritrean students mastering new skills. Free courses available.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary text-base px-10 py-4">
              Get started free
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </Link>
            <Link to="/courses" className="btn-outline text-base px-10 py-4">Browse courses</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ECE5CE]/5 py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber to-rust flex items-center justify-center text-white text-xs font-bold">EA</div>
                <span className="font-display font-bold text-lg text-[#ECE5CE]">EritreaAcademy</span>
              </div>
              <p className="text-sm text-[#ECE5CE]/40 max-w-sm">
                Empowering Eritrean learners with quality education in their own language. English, computer skills, world languages, and typing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#ECE5CE] mb-3">Learn</h4>
              <div className="flex flex-col gap-2">
                <Link to="/courses" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Courses</Link>
                <Link to="/courses?category=English" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">English</Link>
                <Link to="/courses?category=Computer" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Computer Skills</Link>
                <Link to="/typing" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Typing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#ECE5CE] mb-3">Connect</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:support@erilearn.io" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Support</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Facebook</a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Telegram</a>
                <a href="mailto:info@erilearn.io" className="text-sm text-[#ECE5CE]/40 hover:text-[#ECE5CE] transition-colors">Email</a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#ECE5CE]/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#ECE5CE]/30">
            <p>© {new Date().getFullYear()} Eritrea Academy. All rights reserved.</p>
            <p>Made with purpose for Eritrean learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
