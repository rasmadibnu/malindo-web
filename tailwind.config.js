/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#f8cf17',
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
  plugins: [],
};
