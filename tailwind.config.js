/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Esto permite que se active el modo oscuro al agregar la clase 'dark'

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
