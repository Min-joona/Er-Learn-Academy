import { createContext, useContext, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('token', token);
    setUser(user);
  };

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
  const setProgress = async (courseSlug, progress) => {
    try { const { data } = await api.post('/api/auth/progress', { courseSlug, progress }); persist(data.user, null); } catch { /* noop */ }
  };
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, enroll, setProgress, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
