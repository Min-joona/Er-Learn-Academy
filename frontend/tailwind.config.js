/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        povir: {
          bg: 'rgba(var(--color-bg), <alpha-value>)',
          'bg-alt': 'rgba(var(--color-bg-alt), <alpha-value>)',
          surface: 'rgba(var(--color-surface), <alpha-value>)',
          card: 'rgba(var(--color-card), <alpha-value>)',
          'card-hover': 'rgba(var(--color-card-hover), <alpha-value>)',
          border: 'rgba(var(--color-border), <alpha-value>)',
          sidebar: 'rgba(var(--color-sidebar), <alpha-value>)',
          'sidebar-item': 'rgba(var(--color-sidebar-item), <alpha-value>)',
          text: 'rgba(var(--color-text), <alpha-value>)',
          'text-secondary': 'rgba(var(--color-text-secondary), <alpha-value>)',
          'text-muted': 'rgba(var(--color-text-muted), <alpha-value>)',
          primary: 'rgba(var(--color-primary), <alpha-value>)',
          'primary-hover': 'rgba(var(--color-primary-hover), <alpha-value>)',
          'primary-soft': 'rgba(var(--color-primary-soft), <alpha-value>)',
          'primary-text': 'rgba(var(--color-primary-text), <alpha-value>)',
          gold: 'rgba(var(--color-accent-gold), <alpha-value>)',
          'gold-soft': 'rgba(var(--color-accent-gold-soft), <alpha-value>)',
          purple: 'rgba(var(--color-accent-purple), <alpha-value>)',
          'purple-soft': 'rgba(var(--color-accent-purple-soft), <alpha-value>)',
          blue: 'rgba(var(--color-accent-blue), <alpha-value>)',
          pink: 'rgba(var(--color-accent-pink), <alpha-value>)',
          destructive: 'rgba(var(--color-destructive), <alpha-value>)',
          success: 'rgba(var(--color-success), <alpha-value>)',
          warning: 'rgba(var(--color-warning), <alpha-value>)',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        glow: 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(var(--color-primary), 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(var(--color-primary), 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
