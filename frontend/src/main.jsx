import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={
            <div className="fixed inset-0 grid place-items-center" style={{ background: 'rgb(var(--color-bg))' }}>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(var(--color-text-muted), 0.2)' }} />
                  <div className="absolute inset-2 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: 'rgb(var(--color-primary))' }} />
                </div>
                <p className="text-sm font-medium tracking-widest uppercase animate-pulse" style={{ color: 'rgb(var(--color-text-muted))' }}>Loading</p>
              </div>
            </div>
          }>
            <App />
          </Suspense>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgb(var(--color-card))',
                color: 'rgb(var(--color-text))',
                border: '1px solid rgba(var(--color-border), 0.6)',
                borderRadius: '12px',
              },
              success: { iconTheme: { primary: 'rgb(var(--color-success))', secondary: 'rgb(var(--color-primary-text))' } },
              error: { iconTheme: { primary: 'rgb(var(--color-destructive))', secondary: 'white' } },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
