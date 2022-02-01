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
      },
      keyframes: {
        'fade-in-right': {
            '0%': {
                opacity: '0',
                transform: 'translateX(4rem)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateX(0)'
            },
        },
        'fade-in-up': {
          '0%': {
              opacity: '0',
              transform: 'translateY(2rem)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
      },
        'fade-in': {
          '0%': {
            opacity: '0',
        },
        '100%': {
            opacity: '1',
        },
        }
    },
    animation: {
        'fade-in-right-fast': 'fade-in-right .5s ease-in-out',
        'fade-in-right': 'fade-in-right .75s ease-in-out',
        'fade-in-right-slow': 'fade-in-right 1s ease-in-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'smooth': '0.5s ease-out'
    } 
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
