module.exports = {
    purge: ['./src/**/*.ts', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        opacity: ['disabled']
      },
    },
    plugins: [],
}