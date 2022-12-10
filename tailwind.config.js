const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Nunito', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        subNavbarBg: '#333',
        grey69: '#b0b0b0',
      }
    },
  },
  plugins: [],
};
