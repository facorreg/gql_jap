/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const config = {
  resolve: {
    extensions: ['.mjs', '.js'],
    alias: {
      mongo: path.resolve(__dirname, 'src/mongo'),
      models: path.resolve(__dirname, 'src/mongo/models/index.js'),
      queries: path.resolve(__dirname, 'src/queries'),
      utils: path.resolve(__dirname, 'src/utils/index.js'),

      // utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
};

module.exports = config;
