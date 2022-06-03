module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      custom_responsive_1: { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      custom_responsive_2: { max: '900px' },
      // => @media (max-width: 900px) { ... }

      xl: { min: '1279px' },
      // => @media (min-width: 1279px) { ... }

      lg: { min: '1023px' },
      // => @media (min-width: 1023px) { ... }

      md: { min: '767px' },
      // => @media (min-width: 767px) { ... }

      sm: { min: '639px' },
      // => @media (min-width: 639px) { ... }
    },
  },
  plugins: [],
};
