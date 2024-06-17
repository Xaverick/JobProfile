/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGrey: '#a7a9ac',
        darkGrey: '#606060',
        lightGreen: '#B1C000',
        darkGreen: '#b0c036',
        black: '#1d1d1d',
        midGrey: '#98999a',
        greenGray: '#5b6454',
        darkGreyAlt: '#4f5056',
        beige: '#7f7657',
        teal: '#61a3b2',
        oliveGreen: '#9bb133'
      },
      height: {
        'almost-screen': 'calc(100vh - 4rem)', // Adjust the value as needed
      },
    }
  },
  plugins: [],
}

