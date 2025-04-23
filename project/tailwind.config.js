/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-green': '#2C5F3E',
        'gold': '#CBA95D',
        'soft-white': '#F1F1F1',
        'beige': '#DDC6A4',
        'rich-green': '#00573F',
        'dark': {
          'bg': '#1A1A1A',
          'surface': '#262626',
          'border': '#404040',
          'text': '#E5E5E5'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};