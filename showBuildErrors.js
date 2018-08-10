// show build errors in browser
// requires NODE_ENV check to not run in production
// see https://github.com/G-Rath/webpack-serve-overlay/issues/5
if (process.env.NODE_ENV === 'development') {
  require('webpack-serve-overlay')
}
