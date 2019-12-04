const webpack = require('webpack')
const path = require('path')
const { WebpackPluginServe } = require('webpack-plugin-serve')

const outputDir = 'build/'


// webpack's configuration
module.exports = {
  mode: 'development',
  entry: {
    main: ['webpack-plugin-serve/client', './main.js']
  },
  output: {
    path: path.join(__dirname, outputDir), // where builds go
  },
  plugins: [
    new WebpackPluginServe({
      // currently throwing an error: https://github.com/shellscape/webpack-plugin-serve/issues/152
      ramdisk: true, // development build perf optimization
      log: { level: 'debug' }
    })
  ],
}
