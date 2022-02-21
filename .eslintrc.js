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
    "no-param-reassign": ["error", { "props": false }],
    "react/jsx-one-expression-per-line": 0,
    "react/no-array-index-key": 0,
    /**
     * Those jsx rules are ok, but:
     *
     * "click-events-have-key-events" - Sometimes it makes no sense, key events should be added to elements that are
     * focusable in the app. Sometimes I want a click event on an element that's not focusable, like modal overlay.
     * Click handler won't be relevant there.
     *
     * "no-noninteractive-element-interactions" - I disagree that it should be forced, same argument like above,
     * sometimes it's needed, especially if we're having an alternative to this "non-interactive" element,
     * that handles aria well. For example, "non-interactive" modal overlay and "aria interactive" close button.
     */
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
  },
};
