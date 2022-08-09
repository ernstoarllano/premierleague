/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2cecfd',
        accent: '#904bfb',
        tertiary: '#ff2882',
      }
    },
  },
  plugins: [],
}
