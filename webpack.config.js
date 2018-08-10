var path = require('path')

var isProd = process.env.NODE_ENV === 'production'
var commonEntry = ['webpack-serve-overlay/onlyIfProduction', './config/publicPath.js',
  './config/polyfills.js']
var outputDir = 'build/'

// webpack's configuration
module.exports = {
  // setting NODE_ENV does _not_ automatically set mode
  mode: isProd ? 'production' : 'development',
  entry: {
    main: commonEntry.concat('./main.js')
  },
  output: {
    path: path.join(__dirname, outputDir), // where builds go
    filename: '[name].bundle.js'
  },
  resolve: {
    // resolve from package root as well, so utils/... , etc works
    modules: [__dirname, 'node_modules']
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
      {
        test: /\.pcss$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.pcssm$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.cssm$/,
        loader: 'style-loader!css-loader?modules'
      },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      // fonts should normally be loaded by URL/CDN, but config if needed
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          // must set publicPath to route to build/fonts/ instead of fonts/
          // see https://github.com/webpack-contrib/file-loader/pull/246
          publicPath: outputDir + 'fonts/'
        }
      }
    ]
  }
}

var webpackServeWaitpage = require('webpack-serve-waitpage')
// webpack-serve configuration
module.exports.serve = {
  mode: 'development', // only use for development
  devMiddleware: {
    // MUST be set to not be routed to /
    // cannot use relative paths, so must use /build/
    // see https://github.com/webpack/webpack-dev-middleware/issues/269
    publicPath: '/' + outputDir
  },
  add: (app, middleware, options) => {
    // must pass options arg from add args
    // show page on any hot full page reloads as well, not just first bundle
    app.use(webpackServeWaitpage(options, {disableWhenValid: false}))

    // should come after waitpage
    // must use .then() to avoid race conditions
    // see https://github.com/webpack-contrib/webpack-serve/issues/238
    middleware.webpack().then(() => {
      middleware.content()
    })
  }
}
