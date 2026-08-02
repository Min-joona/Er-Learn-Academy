import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const floatingSubjects = [
  { label: 'English', emoji: '🌍', x: '8%', y: '18%', delay: '0s' },
  { label: 'Math', emoji: '📐', x: '78%', y: '12%', delay: '0.5s' },
  { label: 'Computer', emoji: '💻', x: '88%', y: '48%', delay: '1s' },
  { label: 'Arabic', emoji: '🕌', x: '3%', y: '58%', delay: '1.5s' },
  { label: 'Korean', emoji: '🇰🇷', x: '72%', y: '75%', delay: '2s' },
  { label: 'Russian', emoji: '🇷🇺', x: '12%', y: '78%', delay: '2.5s' },
  { label: 'Typing', emoji: '⌨️', x: '82%', y: '30%', delay: '3s' },
  { label: 'Chinese', emoji: '🇨🇳', x: '18%', y: '38%', delay: '3.5s' },
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
  { name: 'Amanuel G.', role: 'English Student', text: 'The placement test was spot-on. I started at Intermediate and within weeks I could feel my English improving.', avatar: 'AG' },
  { name: 'Selam K.', role: 'Computer Skills', text: 'I was scared of computers before. Now I can use spreadsheets, organize files, and built my first presentation.', avatar: 'SK' },
  { name: 'Yonas M.', role: 'Arabic Learner', text: 'The listening exercises with the audio playback are amazing. I practice over and over until it sounds right.', avatar: 'YM' },
];

export default function Landing() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    import('../api/client').then(({ default: api }) =>
      api.get('/api/content/courses').then(({ data }) => setCourses(data)).catch(() => {})
    );
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--color-bg))] via-transparent to-[rgb(var(--color-bg))] z-10 pointer-events-none" />

        {/* Floating subject badges */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {floatingSubjects.map((sub) => (
            <div
              key={sub.label}
              className="absolute animate-float"
              style={{ left: sub.x, top: sub.y, animationDelay: sub.delay, animationDuration: '7s' }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm shadow-sm" style={{ borderColor: 'rgba(var(--color-border), 0.6)', background: 'rgba(var(--color-card), 0.6)' }}>
                <span className="text-lg">{sub.emoji}</span>
                <span className="text-xs font-medium" style={{ color: 'rgba(var(--color-text), 0.7)' }}>{sub.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-5 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6 animate-fade-in" style={{ borderColor: 'rgba(var(--color-primary), 0.2)', background: 'rgba(var(--color-primary), 0.08)', color: 'rgb(var(--color-primary))' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'rgb(var(--color-primary))' }} />
              Empowering Eritrean learners worldwide
            </div>

            <h1 className="font-bold leading-[1.1] text-4xl md:text-6xl lg:text-7xl animate-fade-in" style={{ color: 'rgb(var(--color-text))' }}>
              Learn without limits —<br />
              <span style={{ color: 'rgb(var(--color-primary))' }}>in your language.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto animate-fade-in" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              Master English, computer skills, and world languages with lessons taught in <strong style={{ color: 'rgb(var(--color-text))' }}>Tigrigna</strong>,{' '}
              <strong style={{ color: 'rgb(var(--color-text))' }}>English</strong>, or <strong style={{ color: 'rgb(var(--color-text))' }}>Arabic</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
              <Link to="/courses" className="povir-btn-primary text-base px-8 py-4">
                Explore courses
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></svg>
              </Link>
              <Link to="/typing" className="povir-btn-secondary text-base px-8 py-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,80H176V56a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-64,0H112V64h32ZM48,96H208v16H48ZM48,208V128H208v80Z"/></svg>
                Try typing free
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 justify-center animate-fade-in">
              {[
                { label: 'Courses', value: '8+' },
                { label: 'Languages', value: '6' },
                { label: 'Students', value: '500+' },
                { label: 'Lessons', value: '200+' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold" style={{ color: 'rgb(var(--color-primary))' }}>{s.value}</span>
                  <span className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: 'rgba(var(--color-bg-alt), 0.5)' }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-12">
            <h2 className="povir-section-title">Everything you need to learn</h2>
            <p className="povir-section-sub max-w-xl mx-auto">A complete learning experience designed for Eritrean students, by Eritrean educators.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="povir-card p-6 md:p-8 group">
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">{f.icon}</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'rgb(var(--color-text))' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="povir-section-title">Our courses</h2>
              <p className="povir-section-sub">Pick your path and start learning today.</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: 'rgb(var(--color-primary))' }}>
              View all <span>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 6).map((c) => (
              <Link key={c.slug} to={`/courses/${c.slug}`} className="povir-card-interactive overflow-hidden group p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-card))] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-2xl drop-shadow-lg">{c.flag}</span>
                  <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm" style={{ background: 'rgba(var(--color-card), 0.8)', borderColor: 'rgba(var(--color-border), 0.6)', color: 'rgb(var(--color-text-secondary))' }}>
                    {c.price === 0 ? 'Free' : `$${c.price}`}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg transition-colors" style={{ color: 'rgb(var(--color-text))' }}>{c.title}</h3>
                  <p className="text-sm mt-1 line-clamp-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(c.focus || []).slice(0, 3).map((f) => (
                      <span key={f} className="povir-chip-default text-[10px] px-2 py-1">{f}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-16" style={{ color: 'rgb(var(--color-text-muted))' }}>
              <p>Courses loading...</p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/courses" className="povir-btn-secondary">View all courses</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: 'rgba(var(--color-bg-alt), 0.5)' }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center mb-12">
            <h2 className="povir-section-title">What our students say</h2>
            <p className="povir-section-sub">Real stories from real learners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="povir-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(var(--color-primary), 0.1)', color: 'rgb(var(--color-primary))' }}>{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'rgb(var(--color-text))' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>{t.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgb(var(--color-text-secondary))' }}>"{t.text}"</p>
                <div className="mt-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" style={{ color: 'rgb(var(--color-accent-gold))' }}><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"/></svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(var(--color-primary), 0.05), rgba(var(--color-accent-purple), 0.05))' }} />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>Ready to start learning?</h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: 'rgb(var(--color-text-secondary))' }}>Join hundreds of Eritrean students mastering new skills. Free courses available.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="povir-btn-primary text-base px-10 py-4">
              Get started free
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></svg>
            </Link>
            <Link to="/courses" className="povir-btn-secondary text-base px-10 py-4">Browse courses</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ borderTop: '1px solid rgba(var(--color-border), 0.6)' }}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: 'rgb(var(--color-primary))', color: 'rgb(var(--color-primary-text))' }}>EA</div>
                <span className="font-bold text-lg" style={{ color: 'rgb(var(--color-text))' }}>Eritrea Academy</span>
              </div>
              <p className="text-sm max-w-sm" style={{ color: 'rgb(var(--color-text-muted))' }}>
                Empowering Eritrean learners with quality education in their own language. English, computer skills, world languages, and typing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: 'rgb(var(--color-text))' }}>Learn</h4>
              <div className="flex flex-col gap-2">
                <Link to="/courses" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Courses</Link>
                <Link to="/courses?category=English" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>English</Link>
                <Link to="/courses?category=Computer" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Computer Skills</Link>
                <Link to="/typing" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Typing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3" style={{ color: 'rgb(var(--color-text))' }}>Connect</h4>
              <div className="flex flex-col gap-2">
                <a href="mailto:support@erilearn.io" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Support</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Facebook</a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Telegram</a>
                <a href="mailto:info@erilearn.io" className="text-sm transition-colors" style={{ color: 'rgb(var(--color-text-muted))' }}>Email</a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: '1px solid rgba(var(--color-border), 0.6)', color: 'rgba(var(--color-text-muted), 0.8)' }}>
            <p>© {new Date().getFullYear()} Eritrea Academy. All rights reserved.</p>
            <p>Made with purpose for Eritrean learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
