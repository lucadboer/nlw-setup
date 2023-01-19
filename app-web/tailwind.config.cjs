/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      colors: {
        background: '#09090A',
      },
      boxShadow: {
        button: '0px 0px 12px 2px rgb(139 92 246)',
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
