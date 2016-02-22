// webpack.config.js
module.exports = {
  entry: './src/PropMap.js',
  output: {
    path: './build',
    filename: 'PropMap.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules','src'],
    extensions: ['', '.js', '.json']
  }
};
