import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, enroll, updateProgress } = useAuth();
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
        <div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" />
      </div>
    </div>
  );

  const { course, lessons, quizzes, flashcards, exams } = bundle;
  const enrollment = user?.enrollments?.find((e) => e.courseSlug === slug);
  const myLessons = enrollment ? lessons.filter((l) => l.level === enrollment.level || l.level === 'Beginner') : lessons;

  const startEnroll = () => {
    if (!user) { toast('Please log in to enroll'); navigate('/login'); return; }
    setEnrolling(true);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="relative overflow-hidden rounded-2xl aspect-video group">
            <img src={course.image} alt={course.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#322938]/50 to-transparent" />
            <span className="absolute bottom-4 left-4 text-4xl">{course.flag}</span>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#CFC89A]">{course.title}</h1>
            {course.titleTi && <p className="text-[#CFC89A]/30 font-display text-lg mt-1">{course.titleTi}</p>}
            <p className="mt-3 text-[#CFC89A]/60 leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(course.focus || []).map((f) => <span key={f} className="pill-amber text-xs">{f}</span>)}
              {(course.instructionLanguages || []).map((l) => <span key={l} className="pill bg-[#CFC89A]/10 text-[#CFC89A]/40 text-xs">in {l}</span>)}
            </div>

            {enrollment ? (
              <div className="mt-6 p-5 rounded-2xl bg-amber/5 border border-amber/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber">
                    <span className="mr-2">✓</span>Enrolled · {enrollment.level}
                  </span>
                  <span className="text-xs text-[#CFC89A]/40">{enrollment.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#CFC89A]/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber to-rust transition-all duration-500" style={{ width: `${enrollment.progress}%` }} />
                </div>
              </div>
            ) : (
              <button onClick={startEnroll} className="btn-primary mt-6 w-full md:w-auto py-3.5 px-8">
                Enroll {course.price === 0 ? '— Free' : `— $${course.price}`}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
              </button>
            )}
          </div>
        </div>

        {/* Modules */}
        {course.modules?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-display font-bold text-[#CFC89A] mb-4">What you'll learn</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {(course.modules).map((m, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-[#CFC89A]/10 bg-[#CFC89A]/5 px-4 py-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber/10 text-xs font-bold text-amber">{i + 1}</span>
                  <span className="text-sm text-[#CFC89A]/70">{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enrolled Tabs */}
        {enrollment && (
          <>
            <div className="flex gap-1 border-b border-[#CFC89A]/10 pb-1 mb-6 overflow-x-auto no-scrollbar">
              {[
                { id: 'lessons', label: 'Lessons', icon: '📖' },
                { id: 'quizzes', label: 'Quizzes', icon: '📝' },
                { id: 'flashcards', label: 'Flashcards', icon: '🃏' },
                { id: 'exams', label: 'Exams', icon: '🏆' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium rounded-t-lg transition-all ${
                    tab === t.id ? 'text-amber border-b-2 border-amber bg-amber/5' : 'text-[#CFC89A]/40 hover:text-[#CFC89A]/70'
                  }`}
                >
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>

            {/* Lessons Tab */}
            {tab === 'lessons' && (
              <div className="space-y-2">
                {myLessons.map((l) => (
                  <button key={l._id} onClick={() => setOpenLesson(l)} className="flex w-full items-center gap-4 rounded-xl border border-[#CFC89A]/10 bg-[#CFC89A]/[0.02] px-5 py-4 text-left transition-all hover:border-amber/30 hover:bg-amber/[0.02] group">
                    <span className="text-xl">{l.type === 'Reading' ? '📖' : l.type === 'Listening' ? '🎧' : '✏️'}</span>
                    <div className="flex-1">
                      <p className="font-medium text-[#CFC89A] group-hover:text-amber transition-colors">{l.title}</p>
                      <p className="text-xs text-[#CFC89A]/40">{l.type} · {l.level}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="text-[#CFC89A]/20 group-hover:text-amber/50 transition-colors"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
                  </button>
                ))}
                {myLessons.length === 0 && <p className="text-center py-10 text-[#CFC89A]/30">Lessons coming soon for this level.</p>}
              </div>
            )}

            {/* Quizzes Tab */}
            {tab === 'quizzes' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {quizzes.map((q) => (
                  <div key={q._id} className="card flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#CFC89A]">{q.title}</p>
                      <p className="text-xs text-[#CFC89A]/40">{q.questions?.length || 0} questions</p>
                    </div>
                    <button onClick={() => setOpenQuiz(q)} className="btn-primary py-2 px-4 text-sm">Start</button>
                  </div>
                ))}
                {quizzes.length === 0 && <p className="text-[#CFC89A]/30 col-span-2 text-center py-10">No quizzes yet.</p>}
              </div>
            )}

            {/* Flashcards Tab */}
            {tab === 'flashcards' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {flashcards.map((d) => (
                  <div key={d._id} className="card">
                    <p className="font-semibold text-[#CFC89A]">{d.title}</p>
                    <p className="text-xs text-[#CFC89A]/40">{d.cards?.length || 0} cards</p>
                    <button onClick={() => { setOpenFlashcard(d); setFlashcardIdx(0); }} className="btn-outline mt-3 py-2 px-4 text-sm">Review</button>
                  </div>
                ))}
                {flashcards.length === 0 && <p className="text-[#CFC89A]/30 col-span-2 text-center py-10">No flashcards yet.</p>}
              </div>
            )}

            {/* Exams Tab */}
            {tab === 'exams' && (
              <div className="space-y-3">
                {exams.map((ex) => (
                  <div key={ex._id} className="card">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#CFC89A]">{ex.title}</p>
                      <span className={`pill text-xs ${ex.kind === 'Practical' ? 'pill-rust' : 'pill-amber'}`}>{ex.kind}</span>
                    </div>
                    {ex.kind === 'Practical' ? (
                      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[#CFC89A]/60">
                        {ex.tasks?.map((t, i) => <li key={i}>{t}</li>)}
                      </ol>
                    ) : (
                      <p className="mt-2 text-sm text-[#CFC89A]/50">{ex.questions?.length || 0} questions</p>
                    )}
                  </div>
                ))}
                {exams.length === 0 && <p className="text-[#CFC89A]/30 text-center py-10">No exams yet.</p>}
              </div>
            )}
          </>
        )}
      </div>

      {/* Enroll Modal */}
      {enrolling && <EnrollModal course={course} onDone={() => { setEnrolling(false); load(); }} />}

      {/* Lesson Modal */}
      {openLesson && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setOpenLesson(null)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#CFC89A]/10 bg-[#322938] p-6 md:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="pill-amber text-xs">{openLesson.type} · {openLesson.level}</span>
                <h2 className="mt-2 text-2xl font-display font-bold text-[#CFC89A]">{openLesson.title}</h2>
              </div>
              <button onClick={() => setOpenLesson(null)} className="text-[#CFC89A]/30 hover:text-[#CFC89A] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
              </button>
            </div>

            {openLesson.type === 'Listening' && openLesson.listenText && (
              <div className="flex items-center gap-3 rounded-xl bg-amber/5 border border-amber/10 p-4 mb-4">
                <button onClick={() => { if (window.speechSynthesis) { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(openLesson.listenText); u.rate = 0.9; window.speechSynthesis.speak(u); } }} className="btn-primary py-2 px-4 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,80,158V98l64-49.57ZM200,96v64a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0Zm24-24V184a8,8,0,0,1-16,0V72a8,8,0,0,1,16,0Z"></path></svg>
                  Play audio
                </button>
                <p className="text-sm text-[#CFC89A]/60">“{openLesson.listenText}”</p>
              </div>
            )}

            <div className="space-y-3 text-[#CFC89A]/70 leading-relaxed whitespace-pre-line">
              {openLesson.body?.split('\n').map((line, i) => (
                <p key={i}>{line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#CFC89A]">$1</strong>')}</p>
              ))}
            </div>

            {openLesson.practiceTask && (
              <div className="mt-4 rounded-xl border border-dashed border-rust/40 bg-rust/5 p-4">
                <p className="flex items-center gap-2 font-semibold text-rust">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.32,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.31,64l24-24L216,84.69Z"></path></svg>
                  Your task
                </p>
                <p className="mt-1 text-sm text-[#CFC89A]/60">{openLesson.practiceTask}</p>
              </div>
            )}

            <button
              onClick={() => { updateProgress(slug, (enrollment?.progress || 0) + 15); toast.success('Lesson completed!'); setOpenLesson(null); }}
              className="btn-primary mt-6 w-full py-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
              Mark complete
            </button>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {openQuiz && <QuizModal quiz={openQuiz} onClose={() => setOpenQuiz(null)} />}

      {/* Flashcard Modal */}
      {openFlashcard && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setOpenFlashcard(null)}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="card p-8 text-center cursor-pointer hover:shadow-2xl transition-shadow" onClick={() => setFlashcardIdx((i) => (i + 1) % openFlashcard.cards.length)}>
              <p className="text-xs text-amber font-medium mb-4">
                {flashcardIdx + 1} / {openFlashcard.cards.length}
              </p>
              <p className="text-2xl font-bold text-[#CFC89A] mb-2">{openFlashcard.cards[flashcardIdx].front}</p>
              <p className="text-sm text-[#CFC89A]/50">{openFlashcard.cards[flashcardIdx].back}</p>
              <p className="mt-6 text-xs text-[#CFC89A]/30">Click to flip</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Enroll Modal */
function EnrollModal({ course, onDone }) {
  const { enroll } = useAuth();
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState(course.instructionLanguages?.[0] || 'English');
  const [placement, setPlacement] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (step === 2) api.get(`/api/content/placement/${course.slug}`).then(({ data }) => setPlacement(data)).catch(() => setStep(3));
  }, [step, course.slug]);

  const finish = async () => {
    let score = 0;
    const total = placement?.questions?.length || 0;
    placement?.questions?.forEach((q, i) => { if (answers[i] === q.answer) score += 1; });
    const level = await enroll({ courseSlug: course.slug, instructionLanguage: lang, placementScore: score, totalQuestions: total });
    toast.success(`Placed at ${level} level!`);
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={onDone}>
      <div className="w-full max-w-lg rounded-2xl border border-[#CFC89A]/10 bg-[#322938] p-6 md:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-[#CFC89A]">Choose language</h2>
            <p className="text-sm text-[#CFC89A]/50 mt-1">Which language should we teach in?</p>
            <div className="mt-5 space-y-2">
              {(course.instructionLanguages || []).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`flex items-center justify-between w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition-all ${lang === l ? 'border-amber bg-amber/5 text-[#CFC89A]' : 'border-[#CFC89A]/10 text-[#CFC89A]/50 hover:border-[#CFC89A]/30'}`}>
                  {l} {lang === l && <span className="text-amber">✓</span>}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary mt-6 w-full py-3">Continue to level test</button>
          </div>
        )}

        {step === 2 && (
          !placement ? (
            <div className="grid place-items-center py-10">
              <div className="relative w-10 h-10"><div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" /><div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" /></div>
              <p className="mt-3 text-sm text-[#CFC89A]/50">Loading placement test...</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-display font-bold text-[#CFC89A]">Level test</h2>
              <p className="text-sm text-[#CFC89A]/50 mt-1">Answer honestly to get placed at the right level.</p>
              <div className="mt-5 max-h-[50vh] space-y-4 overflow-y-auto pr-1 no-scrollbar">
                {placement.questions?.map((q, i) => (
                  <div key={i} className="rounded-xl border border-[#CFC89A]/10 p-4">
                    <p className="font-medium text-sm text-[#CFC89A]">{i + 1}. {q.prompt}</p>
                    <div className="mt-2 space-y-1.5">
                      {q.options?.map((opt, oi) => (
                        <button key={oi} onClick={() => setAnswers({ ...answers, [i]: oi })} className={`flex items-center w-full rounded-lg border-2 px-3 py-2 text-left text-sm transition-all ${answers[i] === oi ? 'border-amber bg-amber/5 text-[#CFC89A]' : 'border-[#CFC89A]/10 text-[#CFC89A]/50 hover:border-[#CFC89A]/30'}`}>
                          <span className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center ${answers[i] === oi ? 'border-amber bg-amber text-white' : 'border-[#CFC89A]/20'}`}>
                            {answers[i] === oi && <span className="text-[10px]">✓</span>}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={finish} disabled={Object.keys(answers).length < (placement.questions?.length || 0)} className="btn-primary mt-6 w-full py-3 disabled:opacity-40">
                Finish & enroll
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* Quiz Modal */
function QuizModal({ quiz, onClose }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [results, setResults] = useState([]);
  const q = quiz.questions[i];
  const correct = picked !== null && picked === q.answer;

  const handlePick = (oi) => {
    if (picked !== null) return;
    setPicked(oi);
    setResults([...results, oi === q.answer]);
  };

  const next = () => {
    if (i + 1 < quiz.questions.length) { setI(i + 1); setPicked(null); }
    else {
      const score = results.filter(Boolean).length;
      const total = quiz.questions.length;
      const pct = Math.round((score / total) * 100);
      onClose();
      setTimeout(() => {
        toast.success(`Quiz complete! ${score}/${total} (${pct}%)`);
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-[#CFC89A]/10 bg-[#322938] p-6 md:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-bold text-lg text-[#CFC89A]">{quiz.title}</h3>
          <button onClick={onClose} className="text-[#CFC89A]/30 hover:text-[#CFC89A]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg></button>
        </div>
        <div className="flex gap-1 mb-4">
          {quiz.questions.map((_, idx) => (
            <div key={idx} className={`h-1 flex-1 rounded-full transition-colors ${idx < i ? (results[idx] ? 'bg-amber' : 'bg-rust') : idx === i ? 'bg-amber/50' : 'bg-[#CFC89A]/10'}`} />
          ))}
        </div>
        <p className="text-xs text-[#CFC89A]/40 mb-1">Question {i + 1} of {quiz.questions.length}</p>
        <p className="font-medium text-[#CFC89A] mb-3">{q.prompt}</p>
        <div className="space-y-2">
          {q.options.map((opt, oi) => {
            const showCorrect = picked !== null && oi === q.answer;
            const showWrong = picked === oi && oi !== q.answer;
            return (
              <button key={oi} onClick={() => handlePick(oi)} className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${showCorrect ? 'border-amber bg-amber/10 text-[#CFC89A]' : showWrong ? 'border-rust bg-rust/10 text-[#CFC89A]' : 'border-[#CFC89A]/10 text-[#CFC89A]/60 hover:border-[#CFC89A]/30'}`}>
                {opt}
                {showCorrect && <span className="text-amber">✓</span>}
                {showWrong && <span className="text-rust">✗</span>}
              </button>
            );
          })}
        </div>
        {picked !== null && q.explanation && (
          <p className={`mt-3 rounded-xl p-3 text-sm ${correct ? 'bg-amber/10 text-amber' : 'bg-rust/10 text-rust'}`}>{q.explanation}</p>
        )}
        {picked !== null && (
          <button onClick={next} className="btn-primary mt-4 w-full py-2.5">
            {i + 1 < quiz.questions.length ? 'Next question' : 'See results'}
          </button>
        )}
      </div>
    </div>
  );
}
