/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const config = {
  resolve: {
    extensions: ['.mjs', '.js'],
    alias: {
      mongo: path.resolve(__dirname, 'src/mongo'),
      models: path.resolve(__dirname, 'src/mongo/models/index.js'),
      apollo: path.resolve(__dirname, 'src/apollo'),
      utils: path.resolve(__dirname, 'src/utils/index.js'),
      queries: path.resolve(__dirname, 'src/apollo/resolvers/queries'),
    },
  },
};

module.exports = config;
