import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Typing = lazy(() => import('./pages/Typing'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CourseForm = lazy(() => import('./pages/admin/CourseForm'));
const LessonManager = lazy(() => import('./pages/admin/LessonManager'));
const QuizManager = lazy(() => import('./pages/admin/QuizManager'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const TeacherDashboard = lazy(() => import('./pages/teacher/TeacherDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-base z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" />
          <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-amber animate-spin" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();
  const location = useLocation();

  const guard = (el) => (user ? el : <Navigate to="/login" state={{ from: location }} replace />);
  const adminGuard = (el) => (user?.role === 'admin' || user?.role === 'teacher' ? el : <Navigate to="/" replace />);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  const suspense = (el) => <Suspense fallback={<PageLoader />}>{el}</Suspense>;

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes location={location}>
            <Route path="/" element={suspense(<Landing />)} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : suspense(<Login />)} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : suspense(<Register />)} />
            <Route path="/courses" element={suspense(<Courses />)} />
            <Route path="/courses/:slug" element={suspense(<CourseDetail />)} />
            <Route path="/typing" element={suspense(<Typing />)} />
            <Route path="/dashboard" element={suspense(guard(<Dashboard />))} />
            <Route path="/teacher" element={suspense(adminGuard(<TeacherDashboard />))} />
            <Route path="/admin" element={suspense(adminGuard(<AdminDashboard />))} />
            <Route path="/admin/courses" element={suspense(adminGuard(<AdminDashboard />))} />
            <Route path="/admin/courses/new" element={suspense(adminGuard(<CourseForm />))} />
            <Route path="/admin/courses/:slug/edit" element={suspense(adminGuard(<CourseForm />))} />
            <Route path="/admin/courses/:slug/lessons" element={suspense(adminGuard(<LessonManager />))} />
            <Route path="/admin/courses/:slug/quizzes" element={suspense(adminGuard(<QuizManager />))} />
            <Route path="/admin/analytics" element={suspense(adminGuard(<Analytics />))} />
            <Route path="*" element={suspense(<NotFound />)} />
          </Routes>
        </main>
        <footer className="border-t border-[#CFC89A]/5 py-8 text-center text-sm text-[#CFC89A]/30">
          <p>© {new Date().getFullYear()} Eritrea Academy — built with purpose.</p>
        </footer>
      </div>
    </AnimatePresence>
  );
}
