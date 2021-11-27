module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '40px': '40px'
      },
      minWidth: {
        '400': '400px'
      },
      colors: {
        gray: {
          light: "#eae8ec",
          lightest: "rgb(245, 243, 243)",
        }
      },
      boxShadow: {
        around: '0 0 1em rgb(109, 101, 101)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
