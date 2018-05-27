var commonEntry = ['./publicPath.es6', './polyfills.es6']
// webpack's configuration
module.exports = {
  entry: {
    main: commonEntry.concat('./main.es6')
  },
  output: {
    path: __dirname + '/build', // where builds go
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
        test: /\.es6$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: ['transform-decorators-legacy']
        }
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
      }
    ]
  },
  mode: process.env.NODE_ENV
}
