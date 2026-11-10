/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        festiveRed: {
          DEFAULT: '#C62828',
          hover: '#A71D1D',
          light: '#FFEBEE'
        },
        sapinGreen: {
          DEFAULT: '#14532D',
          hover: '#0E3E21',
          light: '#F0FDF4'
        },
        accentGold: {
          DEFAULT: '#F4C542',
          hover: '#E5B535',
          dark: '#D4A017'
        },
        creamBg: '#FFFDF8',
        charcoalDark: '#242424'
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};
