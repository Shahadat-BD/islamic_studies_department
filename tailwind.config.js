/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        bangla: ['"Hind Siliguri"', 'sans-serif'],
        english: ['"Inter"', 'sans-serif'],
      },
    },
  },

  plugins: [
    require('daisyui'),
  ],
}
