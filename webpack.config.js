const webpack = require('webpack')
const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const commonEntry = ['./config/publicPath.js', './config/polyfills.js']
const outputDir = 'build/'

const CSSModulesConfig = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]'
    }
  }
}

// webpack's configuration
module.exports = {
  // setting NODE_ENV does _not_ automatically set mode
  mode: isProd ? 'production' : 'development',
  entry: {
    // entry that will be hot-reloaded must come first
    // see https://github.com/webpack-contrib/webpack-serve/issues/119#issuecomment-401502247
    main: commonEntry.concat('./main.js'),
    // don't include errorOverlay in production
    ...(isProd ? {} : {errorOverlay: 'webpack-serve-overlay'})
  },
  output: {
    path: path.join(__dirname, outputDir), // where builds go
    // `hash` is the only option available in development
    filename: '[name].bundle.[' + (isProd ? 'contenthash' : 'hash') + '].js'
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
        exclude: /\.module\.pcss$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.module\.pcss$/,
        use: [{
          loader: 'style-loader'
        }, {
          ...CSSModulesConfig,
          options: { ...CSSModulesConfig.options, importsLoaders: 1 }
        }, {
          loader: 'postcss-loader'
        }]
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.module\.css$/,
        use: [{
          loader: 'style-loader'
        }, CSSModulesConfig]
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
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HTMLPlugin({
      template: 'index.html.ejs'
    }),
    // base module.id on hash instead of order index
    new webpack.HashedModuleIdsPlugin() // only run in prod if per is an issue
  ],
  // only run this for production if perf becomes an issue
  optimization: {
    // split webpack's boilerplate code into separate chunk for better caching
    runtimeChunk: 'single',
    // split vendored code into separate chunk for same reasons
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

// webpack-serve configuration
const waitpage = require('webpack-serve-waitpage')
const convert = require('koa-connect')
const proxy = require('http-proxy-middleware')

module.exports.serve = {
  mode: 'development', // only use for development
  devMiddleware: {
    // MUST be set to not be routed to /
    // cannot use relative paths, so must use /build/
    // see https://github.com/webpack/webpack-dev-middleware/issues/269
    publicPath: '/' + outputDir
  },
  add: async (app, middleware, options) => {
    // must pass options arg from add args
    // show page on any hot full page reloads as well, not just first bundle
    app.use(waitpage(options, {disableWhenValid: false}))

    // should come after waitpage
    // must use await to avoid race conditions
    // see https://github.com/webpack-contrib/webpack-serve/issues/238
    await middleware.webpack()
    await middleware.content()

    // proxy all other requests to back-end
    app.use(convert(proxy('/', { target: 'http://localhost:8081' })))
  }
}
