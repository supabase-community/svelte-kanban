const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const plugins =
  process.env.NODE_ENV === 'production'
    ? [tailwind, autoprefixer, cssnano]
    : [tailwind, autoprefixer]

module.exports = { plugins }
