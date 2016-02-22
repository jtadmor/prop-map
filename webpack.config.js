// webpack.config.js
module.exports = {
  entry: './src/PropMap.js',
  output: {
    path: './dist',
    filename: 'PropMap.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules','src'],
    extensions: ['', '.js', '.json']
  }
};
