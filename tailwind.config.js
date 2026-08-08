/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './*.{js,jsx}',
],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#f9f7f4',
          100: '#f2ede5',
          200: '#e5dcc9',
          300: '#d4c5a9',
          600: '#c97a4c',
          700: '#a0663d',
          900: '#5c3e2a',
        }
      }
    },
  },
  plugins: [],
}
