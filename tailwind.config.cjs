/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'premier-league-bold': ['Premier League Bold', 'sans-serif'],
        'premier-league-regular': ['Premier League Regular', 'sans-serif'],
      },
      colors: {
        primary: '#2cecfd',
        secondary: '#37003c',
        tertiary: '#ff2882',
        accent: '#904bfb',
      },
      bgGradientDeg: {
        0: '0deg',
      }
    },
  },
  plugins: [
    require('tailwindcss-gradient'),
  ],
}
