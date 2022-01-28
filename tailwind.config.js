module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1920px',
        '3xl': '2560px' 
      } 
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
