// webpack.config.js

var webpack = require('webpack')
var path = require('path')
var postcssImport = require('postcss-import')
var cssnext = require('postcss-cssnext')
var rucksack = require('rucksack-css')

// array of plugins to optimize a production build
var prodPlugins = [
  // certain modules, like React, have differing dev and prod builds
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  // optimize the ordering of often used modules in the bundle
  new webpack.optimize.OccurrenceOrderPlugin(),
  // attempt to dedupe any duplicated modules between dependencies
  new webpack.optimize.DedupePlugin(),
  // and finally, minify the JS, with no warnings about dead code
  new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
]

var commonEntry = ['./publicPath.es6', './polyfills.es6']
// webpack's configuration
module.exports = {
  entry: {
    main: commonEntry.concat('./main.es6')
  },
  output: {
    path: './build', // where builds go
    filename: '[name].bundle.js'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  resolve: {
    // resolve from package root as well, so utils/... , etc works
    root: path.resolve('./')
  },
  module: {
    loaders: [
      // use ! to chain loaders; note that the first loader is rightmost (RtL)
      { test: /\.es6$/, loader: 'babel-loader', query: {
        presets: ['es2015', 'react', 'stage-1'],
        plugins: ['transform-decorators-legacy']
      }},
      { test: /\.pcss$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.pcssm$/, loader:
        'style-loader!css-loader?modules&importLoaders=1!postcss-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.cssm$/, loader: 'style-loader!css-loader?modules' },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg|svg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  // set plugins based on current environment
  plugins: process.env.NODE_ENV === 'production' ? prodPlugins : [],
  postcss: function (webpack) {
    return [cssnext(), rucksack(), postcssImport({addDependencyTo: webpack})]
  }
}
