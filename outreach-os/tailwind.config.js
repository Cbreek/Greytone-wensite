/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        greytone: {
          50:  '#F5F2EE',
          100: '#EDE8E0',
          200: '#D8D0C4',
          300: '#BFB4A4',
          400: '#A89880',
          500: '#8C7D68',
          600: '#6E6050',
          700: '#524840',
          800: '#38322C',
          900: '#201E1A',
        }
      }
    }
  },
  plugins: []
}
