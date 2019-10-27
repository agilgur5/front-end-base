/*
  core-js will polyfill _most_ newer features used in the app code
  automatically via @babel/preset-env w/ useBuiltIns.
  Some features are not implemented by core-js and as such should be
  added to this file, which is a common entry point in the Webpack config.
*/
import 'core-js/features/promise' // cross-fetch needs a Promise polyfill
import 'cross-fetch/polyfill' // fetch is not implemented by core-js
