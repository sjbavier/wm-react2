const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      w_green: {
        50: '#E5FAF4',
        100: '#CBF6E8',
        200: '#93ECD0',
        300: '#5FE3B9',
        400: '#26D9A0',
        500: '#1DA57A',
        600: '#178260',
        700: '#12644A',
        800: '#0B4130',
        900: '#06231A'
      },
      w_orange: {
        50: '#FDF7EC',
        100: '#FCEFD9',
        200: '#F9DEB4',
        300: '#F5CA85',
        400: '#F0AF47',
        500: '#E59413',
        600: '#CF8611',
        700: '#B8770F',
        800: '#97620C',
        900: '#714909'
      },
      w_red: {
        50: '#FEF1F2',
        100: '#FDE7EA',
        200: '#FBCBD1',
        300: '#F8A5AF',
        400: '#F47685',
        500: '#E61229',
        600: '#D01027',
        700: '#B40E21',
        800: '#970C1C',
        900: '#760916'
      },
      w_dk_blue: {
        50: '#E3E5ED',
        100: '#CACDDE',
        200: '#9199BA',
        300: '#5E6996',
        400: '#3D4461',
        500: '#1B1E2B',
        600: '#161822',
        700: '#101119',
        800: '#0A0B10',
        900: '#060709'
      }
    },
    extend: {}
  },
  plugins: []
};
