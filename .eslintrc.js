module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'import/prefer-default-export': 'off',
    'array-bracket-spacing': ['error', 'always'],
    'react/require-default-props': [1, {
      'ignoreFunctionalComponents': true
    }],
    'react/jsx-props-no-spreading': 0,
    'max-classes-per-file': ["error", 2],
    'react/jsx-max-props-per-line': [1, { 'maximum': 1 }],
    "no-param-reassign": ["error", { "props": false }]
  },
};
