import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Typing from './pages/Typing';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseForm from './pages/admin/CourseForm';
import LessonManager from './pages/admin/LessonManager';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();
  const guard = (el) => (user ? el : <Navigate to="/login" replace />);
  const adminGuard = (el) => (user && user.role === 'admin' ? el : <Navigate to="/" replace />);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/typing" element={<Typing />} />
        <Route path="/dashboard" element={guard(<Dashboard />)} />
        <Route path="/admin" element={adminGuard(<AdminDashboard />)} />
        <Route path="/admin/courses" element={adminGuard(<AdminDashboard />)} />
        <Route path="/admin/courses/new" element={adminGuard(<CourseForm />)} />
        <Route path="/admin/courses/:slug/edit" element={adminGuard(<CourseForm />)} />
        <Route path="/admin/courses/:slug/lessons" element={adminGuard(<LessonManager />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
