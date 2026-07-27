import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { LenisProvider } from './context/LenisContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const LenisScript = () => {
  React.useEffect(() => { document.documentElement.classList.add('lenis'); }, []);
  return null;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <LenisProvider>
            <LenisScript />
            <Suspense fallback={
              <div className="fixed inset-0 grid place-items-center bg-base z-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-amber/20 animate-spin-slow" />
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-amber animate-spin" />
                    <div className="absolute inset-4 rounded-full bg-amber/10 animate-pulse" />
                  </div>
                  <p className="text-amber/60 text-sm font-medium tracking-widest uppercase">Loading</p>
                </div>
              </div>
            }>
              <App />
            </Suspense>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: { background: '#322938', color: '#CFC89A', border: '1px solid rgba(204,136,58,0.2)', borderRadius: '12px', backdropFilter: 'blur(20px)' },
                success: { iconTheme: { primary: '#CC883A', secondary: '#322938' } },
                error: { iconTheme: { primary: '#A14016', secondary: '#322938' } },
              }}
            />
            <div className="grain-overlay" />
          </LenisProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
