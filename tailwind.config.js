import primeui from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}" ],
  theme: {
    extend: {},
  },
  plugins: [ primeui ],
}

