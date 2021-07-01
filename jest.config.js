module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
  ],
  setupFiles: ['./src/__tests__/jestSetup.js'],
  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/screens/**/*.tsx',
    'src/components/**/*.tsx',
    'src/hooks/**/*.tsx',
    '!src/hooks/index.tsx',
    'src/utils/*.ts',
  ],
};
