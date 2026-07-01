/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: { DEFAULT: '#0f766e', dark: '#115e59', light: '#5eead4' },
        sand: '#faf8f3',
        ink: '#132018',
      },
    },
  },
  plugins: [],
};
