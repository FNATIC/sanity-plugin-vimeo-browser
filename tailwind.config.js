module.exports = {
  purge: {
    content: ["./src/components/**/*.tsx", "./src/components/*.tsx", "./src/App.tsx"],
    safelist: [
      'bg-red-400',
      'bg-gray-400',
      'bg-green-400',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  textColor: {
    'primary': '#ffffff',
  },
  theme: {
    extend: {
      zIndex: {
       0: 0,
       10: 10,
       20: 20,
       30: 30,
       40: 40,
       50: 50,
       70000: 70000,
       800000: 800000
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
