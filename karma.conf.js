module.exports = function(config) {
  config.set({
    broswers: [ 'Chrome', 'Firefox', 'IE', 'Safari' ],
    frameworks: [ 'mocha' ],
    files: [ './tests/*.specs.js'],
    reporters: [ 'dots'],
    preprocessors: {
      './tests/*.specs.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: {
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
      devtool: 'inline-source-map'
    }
  })
}
