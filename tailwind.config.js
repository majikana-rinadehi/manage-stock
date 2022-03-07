module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      height: {
        '40px': '40px'
      },
      minWidth: {
        '400': '400px'
      },
      boxShadow: {
        around: '0 0 1em rgb(109, 101, 101)'
      }
    },
  },
  plugins: [],
}
