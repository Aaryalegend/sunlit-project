/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        dark: '#1C1C1C',
        lightBlue: '#E6F2FF',
        darkFooter: '#171D27',
        overlay: 'rgba(2, 32, 62, 0.57)',
      },
      fontFamily: {
        'century': ['"Century Gothic"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0px 0px 10.7px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
