module.exports = {
  browser: true,
  testRegex: '(\\.|/)(test|spec)\\.ts?$',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/__tests__/styleMock.ts',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
