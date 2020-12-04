/* eslint-disable no-unused-vars */
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const shared = require('./webpack.shared');

// eslint-disable-next-line no-new
new webpack.ContextReplacementPlugin(/.*/);

const config = {
  entry: './server.js',
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
      },
    ],
  },
  ...shared,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  plugins: [new NodemonPlugin()],
};

module.exports = config;
