export default {
  testEnvironment: "node",
  testTimeout: 120000,
  testMatch: [
    "**/tests/**/*.test.js",
  ],

  setupFilesAfterEnv: [
    "<rootDir>/tests/setup.js",
  ],

  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/config/swagger.js",
  ],

  coverageDirectory: "coverage",

  detectOpenHandles: true,

  transform: {},
};