/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],


  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#ffffff',
      secundary: '#03313E',
      accent: '#4CCBDA',
      lightaccent: '#E4F6F9',
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      blue: colors.blue,
      neutral: colors.neutral,
      red: colors.red,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        'header': '48px',
        'sidebar': '264px',
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('daisyui')],

  daisyui: {
    styled: true,
    themes: [
      {
        winter: {
          ...require("daisyui/src/colors/themes")["[data-theme=winter]"],
          primary: "#03313E",
          // secondary: "#d4d4d4",
          secondary: '#4CCBDA',
          accent: "#E4F6F9",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "daisy-",
  },
}
