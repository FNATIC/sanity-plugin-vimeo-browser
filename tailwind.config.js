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
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
