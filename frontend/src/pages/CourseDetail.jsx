import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, enroll, purchase } = useAuth();
  const [bundle, setBundle] = useState(null);
  const [tab, setTab] = useState('lessons');
  const [enrolling, setEnrolling] = useState(false);
  const [openLesson, setOpenLesson] = useState(null);
  const [openQuiz, setOpenQuiz] = useState(null);
  const [openFlashcard, setOpenFlashcard] = useState(null);
  const [flashcardIdx, setFlashcardIdx] = useState(0);

  const load = () => api.get(`/api/content/courses/${slug}`).then(({ data }) => setBundle(data)).catch(() => {});
  useEffect(() => { load(); }, [slug]);

  if (!bundle) return (
    <div className="min-h-screen grid place-items-center pt-20">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(var(--color-text-muted), 0.2)' }} />
        <div className="absolute inset-1 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: 'rgb(var(--color-primary))' }} />
      </div>
    </div>
  );

  const { course, lessons, quizzes, flashcards, exams } = bundle;
  const enrollment = user?.enrollments?.find((e) => e.courseSlug === slug);
  const myLessons = enrollment ? lessons.filter((l) => l.level === enrollment.level || l.level === 'Beginner') : lessons;

  const startEnroll = async () => {
    if (!user) { toast('Please log in to enroll'); navigate('/login'); return; }
    if (course.price > 0) {
      if (!window.confirm(`Purchase ${course.title} for $${course.price}?`)) return;
      try { await purchase(course.slug); toast.success('Course purchased!'); load(); } catch (e) { toast.error(e.response?.data?.message || 'Purchase failed'); }
      return;
    }
    setEnrolling(true);
  };

  const tabs = ['lessons', 'quizzes', 'flashcards', 'exams'].filter((t) => {
    if (t === 'lessons') return lessons?.length > 0;
    if (t === 'quizzes') return quizzes?.length > 0;
    if (t === 'flashcards') return flashcards?.length > 0;
    if (t === 'exams') return exams?.length > 0;
    return true;
  });

  const currentFlashcardSet = flashcards?.[flashcardIdx];
  const flashcard = currentFlashcardSet?.cards?.[openFlashcard];

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="relative overflow-hidden rounded-xl aspect-video group">
            <img src={course.image} alt={course.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--color-card),0.5)] to-transparent" />
            <span className="absolute bottom-4 left-4 text-4xl">{course.flag}</span>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'rgb(var(--color-text))' }}>{course.title}</h1>
            {course.titleTi && <p className="text-lg mt-1" style={{ color: 'rgba(var(--color-text-muted), 0.6)' }}>{course.titleTi}</p>}
            <p className="mt-3 leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{course.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(course.focus || []).map((f) => <span key={f} className="povir-chip-primary text-xs">{f}</span>)}
              {(course.instructionLanguages || []).map((l) => <span key={l} className="povir-chip-default text-xs">in {l}</span>)}
            </div>

            {enrollment ? (
              <div className="mt-6 p-5 rounded-xl" style={{ background: 'rgba(var(--color-primary), 0.05)', border: '1px solid rgba(var(--color-primary), 0.1)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-primary))' }}>
                    <span className="mr-2">✓</span>Enrolled · {enrollment.level}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(var(--color-text-muted), 0.7)' }}>{enrollment.progress}%</span>
                </div>
                <div className="povir-progress">
                  <div className="povir-progress-fill-primary" style={{ width: `${enrollment.progress}%` }} />
                </div>
              </div>
            ) : (
              <div className="mt-6 flex gap-3">
                <button onClick={startEnroll} className="povir-btn-primary" disabled={enrolling}>
                  {enrolling ? 'Enrolling...' : course.price > 0 ? `Purchase — $${course.price}` : 'Enroll free'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        {tabs.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar mb-6">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={tab === t ? 'povir-tab-active' : 'povir-tab'}>
                {t.charAt(0).toUpperCase() + t.slice(1)} ({bundle[t]?.length || 0})
              </button>
            ))}
          </div>
        )}

        {/* Lessons */}
        {tab === 'lessons' && (
          <div className="space-y-3">
            {myLessons.map((l) => (
              <div key={l._id} className="povir-card overflow-hidden">
                <button onClick={() => setOpenLesson(openLesson === l._id ? null : l._id)} className="flex w-full items-center justify-between p-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${l.type === 'Listening' ? 'povir-chip-purple' : 'povir-chip-primary'}`}>
                      {l.type === 'Listening' ? '🎧' : l.type === 'Reading' ? '📖' : '✍️'}
                    </span>
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'rgb(var(--color-text))' }}>{l.title}</p>
                      <p className="text-xs" style={{ color: 'rgb(var(--color-text-muted))' }}>{l.level} · {l.type}</p>
                    </div>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${openLesson === l._id ? 'rotate-180' : ''}`} viewBox="0 0 256 256" fill="currentColor" style={{ color: 'rgb(var(--color-text-muted))' }}><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,165.36l74.34-74.34a8,8,0,0,1,11.32,11.32Z"/></svg>
                </button>
                {openLesson === l._id && (
                  <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: 'rgba(var(--color-border), 0.6)' }}>
                    <div className="mt-3 text-sm leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))', whiteSpace: 'pre-line' }}>{l.body}</div>
                    {l.practiceTask && (
                      <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(var(--color-primary), 0.05)' }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--color-primary))' }}>Practice Task</p>
                        <p className="text-sm" style={{ color: 'rgb(var(--color-text-secondary))', whiteSpace: 'pre-line' }}>{l.practiceTask}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quizzes */}
        {tab === 'quizzes' && (
          <div className="space-y-4">
            {quizzes.map((q) => (
              <div key={q._id} className="povir-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold" style={{ color: 'rgb(var(--color-text))' }}>{q.title}</h3>
                  <span className="povir-chip-default text-xs">{q.questions?.length || 0} questions</span>
                </div>
                <div className="space-y-3">
                  {(q.questions || []).slice(0, openQuiz === q._id ? undefined : 1).map((qn, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(var(--color-surface), 0.5)' }}>
                      <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--color-text))' }}>{qn.question || qn.prompt}</p>
                      <div className="space-y-1.5">
                        {(qn.options || []).map((opt, j) => (
                          <div key={j} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${j === qn.correctIndex || j === qn.answer ? '' : ''}`} style={{
                            background: j === (qn.correctIndex || qn.answer) ? 'rgba(var(--color-primary), 0.1)' : 'transparent',
                            color: j === (qn.correctIndex || qn.answer) ? 'rgb(var(--color-primary))' : 'rgb(var(--color-text-secondary))',
                          }}>
                            <span>{String.fromCharCode(65 + j)}.</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {(q.questions || []).length > 1 && (
                  <button onClick={() => setOpenQuiz(openQuiz === q._id ? null : q._id)} className="text-xs font-medium mt-3 transition-colors" style={{ color: 'rgb(var(--color-primary))' }}>
                    {openQuiz === q._id ? 'Show less' : `Show all ${q.questions.length} questions`}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Flashcards */}
        {tab === 'flashcards' && (
          <div className="space-y-4">
            {flashcards.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {flashcards.map((set, i) => (
                  <button key={i} onClick={() => { setFlashcardIdx(i); setOpenFlashcard(0); }} className={flashcardIdx === i ? 'povir-chip-primary text-xs' : 'povir-chip-default text-xs'}>
                    {set.title}
                  </button>
                ))}
              </div>
            )}
            {currentFlashcardSet && (
              <div className="povir-card p-8 text-center">
                {openFlashcard !== null && flashcard ? (
                  <div>
                    <p className="text-2xl font-bold mb-6" style={{ color: 'rgb(var(--color-text))' }}>{flashcard.front}</p>
                    <p className="text-xl" style={{ color: 'rgb(var(--color-primary))' }}>{flashcard.back}</p>
                    <div className="flex justify-center gap-3 mt-8">
                      <button onClick={() => setOpenFlashcard(Math.max(0, openFlashcard - 1))} disabled={openFlashcard === 0} className="povir-btn-secondary text-sm" style={{ opacity: openFlashcard === 0 ? 0.5 : 1 }}>Previous</button>
                      <button onClick={() => setOpenFlashcard(openFlashcard + 1)} disabled={openFlashcard >= currentFlashcardSet.cards.length - 1} className="povir-btn-primary text-sm" style={{ opacity: openFlashcard >= currentFlashcardSet.cards.length - 1 ? 0.5 : 1 }}>Next</button>
                    </div>
                    <p className="text-xs mt-4" style={{ color: 'rgb(var(--color-text-muted))' }}>{openFlashcard + 1} of {currentFlashcardSet.cards.length}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-4" style={{ color: 'rgb(var(--color-text))' }}>{currentFlashcardSet.title}</p>
                    <p className="text-sm mb-6" style={{ color: 'rgb(var(--color-text-muted))' }}>{currentFlashcardSet.cards?.length || 0} cards</p>
                    <button onClick={() => setOpenFlashcard(0)} className="povir-btn-primary">Start reviewing</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Exams */}
        {tab === 'exams' && (
          <div className="space-y-4">
            {exams.map((e) => (
              <div key={e._id} className="povir-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold" style={{ color: 'rgb(var(--color-text))' }}>{e.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'rgb(var(--color-text-muted))' }}>{e.level} · {e.questions?.length || 0} questions</p>
                  </div>
                  <span className="povir-chip-default text-xs">{e.kind || 'Standard'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
