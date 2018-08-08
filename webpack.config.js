var path = require('path')

var isProd = process.env.NODE_ENV === 'production'
var commonEntry = ['./publicPath.js', './polyfills.js']

// webpack's configuration
module.exports = {
  // setting NODE_ENV does _not_ automatically set mode
  mode: isProd ? 'production' : 'development',
  entry: {
    main: commonEntry.concat('./main.js')
  },
  output: {
    path: path.join(__dirname, '/build'), // where builds go
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
          publicPath: './build/fonts/'
        }
      }
    ]
  }
}
