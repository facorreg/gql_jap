/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest', // Adding this line solved the issue
  },
  moduleNameMapper: {
    mongo: '<rootDir>/src/mongo',
    models: '<rootDir>/src/mongo/models/index.js',
    queries: '<rootDir>/src/queries',
    utils: '<rootDir>/src/utils/index.js',
  },
};
