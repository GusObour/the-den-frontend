module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the path as per your project structure
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        black: '#030509',
        blue: '#375C95',
        'light-blue': '#71A2DF',
        'dark-gray': '#4A5C75',
        'light-gray': '#AACFF6',
        'black-2': '#010201',
        'black-3': '#000001',
        'uranian-blue': '#afd1f4',
      },
      aspectRatio: {
        '16/9': [16, 9],
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
