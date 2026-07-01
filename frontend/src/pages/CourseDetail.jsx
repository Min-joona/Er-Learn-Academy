import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen, Headphones, PenTool, Volume2, Check, X, Play,
  ClipboardCheck, Layers, ListChecks, Award, ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const typeIcon = { Reading: BookOpen, Listening: Headphones, Practice: PenTool };

/* ---------- Enroll flow (instruction language -> placement test -> level) ---------- */
function EnrollFlow({ course, onDone }) {
  const { enroll } = useAuth();
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState(course.instructionLanguages[0]);
  const [placement, setPlacement] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (step === 2) api.get(`/api/content/placement/${course.slug}`).then(({ data }) => setPlacement(data)).catch(() => setStep(3));
  }, [step, course.slug]);

  const finish = async () => {
    let score = 0;
    const total = placement?.questions.length || 0;
    placement?.questions.forEach((q, i) => { if (answers[i] === q.answer) score += 1; });
    const level = await enroll({ courseSlug: course.slug, instructionLanguage: lang, placementScore: score, totalQuestions: total });
    toast.success(`Placed at ${level} level!`);
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onDone}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
        {/* Step 1: instruction language */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl font-extrabold">Choose your learning language</h2>
            <p className="mt-1 text-sm text-ink/60">Which language should we teach you <strong>{course.title}</strong> in?</p>
            <div className="mt-5 grid gap-3">
              {course.instructionLanguages.map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left font-semibold ${lang === l ? 'border-teal bg-teal/5' : 'border-ink/10'}`}>
                  {l} {lang === l && <Check className="text-teal" size={18} />}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full">Continue to level test</button>
          </div>
        )}

        {/* Step 2: placement test */}
        {step === 2 && (
          !placement ? <div className="grid place-items-center py-10"><div className="h-8 w-8 animate-spin rounded-full border-4 border-ink/10 border-t-teal" /></div> : (
            <div>
              <h2 className="font-display text-2xl font-extrabold">Quick level test</h2>
              <p className="mt-1 text-sm text-ink/60">Answer honestly — we'll place you at the right level.</p>
              <div className="mt-5 max-h-[50vh] space-y-5 overflow-y-auto pr-1">
                {placement.questions.map((q, i) => (
                  <div key={i}>
                    <p className="font-semibold">{i + 1}. {q.prompt}</p>
                    <div className="mt-2 grid gap-2">
                      {q.options.map((opt, oi) => (
                        <button key={oi} onClick={() => setAnswers({ ...answers, [i]: oi })} className={`rounded-xl border-2 px-3 py-2 text-left text-sm ${answers[i] === oi ? 'border-teal bg-teal/5' : 'border-ink/10'}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={finish}
                disabled={Object.keys(answers).length < placement.questions.length}
                className="btn-primary mt-6 w-full disabled:opacity-40"
              >
                Finish & enroll
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* ---------- Listening player (browser speech synthesis) ---------- */
function ListenButton({ text }) {
  const speak = () => {
    if (!window.speechSynthesis) return toast.error('Audio not supported in this browser');
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };
  return <button onClick={speak} className="btn-primary py-2"><Volume2 size={16} /> Play audio</button>;
}

/* ---------- Quiz player (reused inline) ---------- */
function QuizModal({ quiz, onClose }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const q = quiz.questions[i];
  const correct = picked === q.answer;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between"><h3 className="font-display text-lg font-extrabold">{quiz.title}</h3><button onClick={onClose}><X /></button></div>
        <p className="mt-3 text-sm text-ink/50">Question {i + 1} of {quiz.questions.length}</p>
        <p className="mt-1 font-semibold">{q.prompt}</p>
        <div className="mt-3 space-y-2">
          {q.options.map((opt, oi) => {
            const showCorrect = picked !== null && oi === q.answer;
            const showWrong = picked === oi && oi !== q.answer;
            return (
              <button key={oi} onClick={() => picked === null && setPicked(oi)} className={`flex w-full items-center justify-between rounded-xl border-2 px-3 py-2 text-left text-sm ${showCorrect ? 'border-green-500 bg-green-50' : showWrong ? 'border-red-400 bg-red-50' : 'border-ink/10'}`}>
                {opt}{showCorrect && <Check size={16} className="text-green-600" />}{showWrong && <X size={16} className="text-red-500" />}
              </button>
            );
          })}
        </div>
        {picked !== null && <p className={`mt-3 rounded-xl p-3 text-sm ${correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{q.explanation}</p>}
        {picked !== null && (
          <button onClick={() => { if (i + 1 < quiz.questions.length) { setI(i + 1); setPicked(null); } else onClose(); }} className="btn-primary mt-4 w-full">
            {i + 1 < quiz.questions.length ? 'Next' : 'Done'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, setProgress } = useAuth();
  const [bundle, setBundle] = useState(null);
  const [tab, setTab] = useState('lessons');
  const [enrolling, setEnrolling] = useState(false);
  const [openLesson, setOpenLesson] = useState(null);
  const [openQuiz, setOpenQuiz] = useState(null);

  const load = () => api.get(`/api/content/courses/${slug}`).then(({ data }) => setBundle(data));
  useEffect(() => { load(); }, [slug]);

  if (!bundle) return <div className="grid place-items-center py-32"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-teal" /></div>;

  const { course, lessons, quizzes, flashcards, exams } = bundle;
  const enrollment = user?.enrollments?.find((e) => e.courseSlug === slug);
  const myLessons = enrollment ? lessons.filter((l) => l.level === enrollment.level || l.level === 'Beginner') : lessons;

  const startEnroll = () => {
    if (!user) { toast('Please log in to enroll'); return navigate('/login'); }
    setEnrolling(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Header */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl"><img src={course.image} alt={course.title} className="h-full w-full object-cover" /></div>
        <div>
          <span className="text-3xl">{course.flag}</span>
          <h1 className="mt-1 font-display text-4xl font-extrabold">{course.title} <span className="text-lg font-normal text-ink/40">{course.titleTi}</span></h1>
          <p className="mt-2 text-ink/70">{course.description}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {course.focus.map((f) => <span key={f} className="pill bg-teal/10 text-teal">{f}</span>)}
            {course.instructionLanguages.map((l) => <span key={l} className="pill bg-ink/5 text-ink/50">in {l}</span>)}
          </div>
          {enrollment ? (
            <div className="mt-5 rounded-2xl bg-teal/5 p-4">
              <p className="text-sm font-semibold text-teal">✓ Enrolled · {enrollment.level} level · learning in {enrollment.instructionLanguage}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-teal" style={{ width: `${enrollment.progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-ink/50">{enrollment.progress}% complete</p>
            </div>
          ) : (
            <button onClick={startEnroll} className="btn-primary mt-5">
              Enroll {course.price === 0 ? 'free' : `· $${course.price}`} <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Curriculum outline */}
      <div className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">What you'll learn</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {course.modules.map((m, i) => (
            <div key={m} className="flex items-center gap-3 rounded-xl border border-ink/5 bg-white px-4 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal/10 text-sm font-bold text-teal">{i + 1}</span>
              <span className="text-sm">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled content tabs */}
      {enrollment && (
        <div className="mt-10">
          <div className="flex gap-2 border-b border-ink/10">
            {[['lessons', ListChecks, 'Lessons'], ['quizzes', ClipboardCheck, 'Quizzes'], ['flashcards', Layers, 'Flashcards'], ['exams', Award, 'Exams']].map(([id, Icon, label]) => (
              <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-1 px-4 py-3 text-sm font-semibold ${tab === id ? 'border-b-2 border-teal text-teal' : 'text-ink/50'}`}>
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          {tab === 'lessons' && (
            <div className="mt-5 space-y-2">
              {myLessons.map((l) => {
                const Icon = typeIcon[l.type];
                return (
                  <button key={l._id} onClick={() => setOpenLesson(l)} className="flex w-full items-center gap-3 rounded-xl border border-ink/5 bg-white px-4 py-3 text-left transition hover:border-teal">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal/10 text-teal"><Icon size={16} /></span>
                    <div className="flex-1"><p className="font-semibold">{l.title}</p><p className="text-xs text-ink/50">{l.type} · {l.level}</p></div>
                    <Play size={16} className="text-ink/30" />
                  </button>
                );
              })}
              {myLessons.length === 0 && <p className="py-6 text-center text-ink/50">Lessons for this course are coming soon.</p>}
            </div>
          )}

          {tab === 'quizzes' && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {quizzes.map((q) => (
                <div key={q._id} className="card flex items-center justify-between py-4">
                  <div><p className="font-semibold">{q.title}</p><p className="text-xs text-ink/50">{q.questions.length} questions</p></div>
                  <button onClick={() => setOpenQuiz(q)} className="btn-primary py-2">Start</button>
                </div>
              ))}
              {quizzes.length === 0 && <p className="text-ink/50">No quizzes yet.</p>}
            </div>
          )}

          {tab === 'flashcards' && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {flashcards.map((d) => (
                <div key={d._id} className="card">
                  <p className="font-semibold">{d.title}</p>
                  <p className="text-xs text-ink/50">{d.cards.length} cards</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {d.cards.slice(0, 4).map((c, i) => <span key={i} className="pill bg-teal/10 text-teal">{c.front} → {c.back}</span>)}
                  </div>
                </div>
              ))}
              {flashcards.length === 0 && <p className="text-ink/50">No flashcards yet.</p>}
            </div>
          )}

          {tab === 'exams' && (
            <div className="mt-5 space-y-3">
              {exams.map((ex) => (
                <div key={ex._id} className="card">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{ex.title}</p>
                    <span className={`pill ${ex.kind === 'Practical' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{ex.kind}</span>
                  </div>
                  {ex.kind === 'Practical' ? (
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink/70">
                      {ex.tasks.map((t, i) => <li key={i}>{t}</li>)}
                    </ol>
                  ) : (
                    <p className="mt-2 text-sm text-ink/60">{ex.questions.length} theory questions. Take it when you feel ready.</p>
                  )}
                </div>
              ))}
              {exams.length === 0 && <p className="text-ink/50">No exams yet.</p>}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {enrolling && <EnrollFlow course={course} onDone={() => { setEnrolling(false); load(); }} />}
      {openQuiz && <QuizModal quiz={openQuiz} onClose={() => setOpenQuiz(null)} />}
      {openLesson && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpenLesson(null)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <span className="pill bg-teal/10 text-teal">{openLesson.type} · {openLesson.level}</span>
                <h2 className="mt-2 font-display text-2xl font-extrabold">{openLesson.title}</h2>
              </div>
              <button onClick={() => setOpenLesson(null)}><X /></button>
            </div>
            {openLesson.type === 'Listening' && openLesson.listenText && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-teal/5 p-4">
                <ListenButton text={openLesson.listenText} />
                <p className="text-sm text-ink/60">“{openLesson.listenText}”</p>
              </div>
            )}
            <div className="mt-4 space-y-2 whitespace-pre-line leading-relaxed text-ink/80">
              {openLesson.body?.split('\n').map((line, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
            {openLesson.practiceTask && (
              <div className="mt-4 rounded-2xl border-2 border-dashed border-teal/40 bg-teal/5 p-4">
                <p className="flex items-center gap-2 font-semibold text-teal"><PenTool size={16} /> Your task</p>
                <p className="mt-1 text-sm text-ink/70">{openLesson.practiceTask}</p>
              </div>
            )}
            <button
              onClick={() => { setProgress(slug, (enrollment?.progress || 0) + 15); toast.success('Lesson complete! +progress'); setOpenLesson(null); }}
              className="btn-primary mt-5 w-full"
            >
              <Check size={16} /> Mark complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
