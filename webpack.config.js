const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: {
      'inverted-index.build': ['./dist/js/inverted-index.js'],
      'inverted-index.spec': './dist/spec/inverted-index.spec.js'
  },
  output: {
    path: __dirname + './dist/build',
    filename: '[name].js'
  }
};
