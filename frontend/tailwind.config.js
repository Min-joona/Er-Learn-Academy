/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Lexend', 'system-ui', 'sans-serif'], display: ['Lexend', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'Fira Code', 'monospace'] },
      colors: {
        surface: { DEFAULT: '#CFC89A', light: '#E8E4CC', dark: '#B0A87A' },
        base: { DEFAULT: '#322938', light: '#4A3F55', dark: '#1F1825', foreground: '#CFC89A' },
        sage: { DEFAULT: '#89A194', light: '#A8BCAD', dark: '#6A8275' },
        amber: { DEFAULT: '#CC883A', light: '#E0A45C', dark: '#B07028' },
        rust: { DEFAULT: '#A14016', light: '#C85A2A', dark: '#7A3008' },
      },
      animation: { 'fade-in': 'fadeIn 0.6s ease-out', 'slide-up': 'slideUp 0.6s ease-out', 'slide-down': 'slideDown 0.4s ease-out', 'scale-in': 'scaleIn 0.4s ease-out', 'glow': 'glow 2s ease-in-out infinite alternate', 'float': 'float 6s ease-in-out infinite', 'shimmer': 'shimmer 2s linear infinite', 'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', 'spin-slow': 'spin 8s linear infinite', 'wiggle': 'wiggle 1s ease-in-out infinite' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        glow: { '0%': { boxShadow: '0 0 20px rgba(204,136,58,0.2)' }, '100%': { boxShadow: '0 0 40px rgba(204,136,58,0.4)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        wiggle: { '0%, 100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
      },
      backgroundImage: { 'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")" },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
