const webpack = require('webpack')
const path = require('path')
const { WebpackPluginServe } = require('webpack-plugin-serve')

const isProd = process.env.NODE_ENV === 'production'
const commonEntry = []
// https://github.com/shellscape/webpack-plugin-serve/blob/master/recipes/entry-points.md
// don't include the serve client in production
if (!isProd) { commonEntry.push('webpack-plugin-serve/client') }
const outputDir = 'build/'


// webpack's configuration
module.exports = {
  // setting NODE_ENV does _not_ automatically set mode
  mode: isProd ? 'production' : 'development',
  entry: {
    main: commonEntry.concat('./main.js')
  },
  output: {
    path: path.join(__dirname, outputDir), // where builds go
    // `hash` is the only option available in development
    filename: '[name].bundle.[' + (isProd ? 'contenthash' : 'hash') + '].js'
  },
  module: {
    rules: [
      // use ! to chain loaders; note that the first loader is rightmost (RtL)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: !isProd } // only cache in development
      },
    ]
  },
  plugins: [
    // don't include serve in production
    ...(isProd ? [] : [new WebpackPluginServe({
      // currently throwing an error: https://github.com/shellscape/webpack-plugin-serve/issues/152
      ramdisk: true, // development build perf optimization
      log: { level: 'debug' }
    })])
  ],
}
