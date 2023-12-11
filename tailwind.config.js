/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#F7931E',
      },
    },
  },
  variants: {
    extend: {
      fontFamily: {
        public: ['Public Sans'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
