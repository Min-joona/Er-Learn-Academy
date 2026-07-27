import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/client';
import toast from 'react-hot-toast';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('user'); return s ? JSON.parse(s) : null; } catch { return null; }
  });

  const persist = useCallback((userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) localStorage.setItem('token', token);
    setUser(userData);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    persist(data.user, data.token);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/api/auth/register', payload);
    persist(data.user, data.token);
    return data.user;
  };

  const enroll = async (payload) => {
    const { data } = await api.post('/api/auth/enroll', payload);
    persist(data.user, null);
    return data.assignedLevel;
  };

  const updateProgress = async (courseSlug, progress) => {
    try {
      const { data } = await api.post('/api/auth/progress', { courseSlug, progress });
      persist(data.user, null);
    } catch { /* silent */ }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out');
  }, []);

  const refreshUser = async () => {
    try {
      const { data } = await api.get('/api/auth/me');
      persist(data.user, null);
    } catch { logout(); }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, enroll, updateProgress, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
