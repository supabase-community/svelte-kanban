const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const plugins =
  process.env.NODE_ENV === 'production'
    ? [autoprefixer, cssnano]
    : [autoprefixer]

module.exports = { plugins }
