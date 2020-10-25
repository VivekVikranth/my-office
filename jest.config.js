module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!@babel)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*.{js}',
    'src/**/*.{js,vue}',
    '!src/main.js', // No need to cover bootstrap file
  ],
}
