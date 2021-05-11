const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      animation: {
        'bounce-slow': 'slow-bounce 2s ease-in-out infinite',
      },
      colors: {
        orange: colors.orange,
      },
      keyframes: {
        'slow-bounce': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      zIndex: {
        '-1': '-1',
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.400'),
            a: {
              color: theme('colors.indigo.300'),
              '&:hover': {
                color: theme('colors.indigo.300'),
              },
            },
            strong: {
              color: theme('colors.gray.400'),
            },
            h1: {
              color: theme('colors.gray.300'),
            },
            h2: {
              color: theme('colors.gray.300'),
            },
            h3: {
              color: theme('colors.gray.300'),
            },
            h4: {
              color: theme('colors.gray.300'),
            },
            h5: {
              color: theme('colors.gray.300'),
            },
            h6: {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
