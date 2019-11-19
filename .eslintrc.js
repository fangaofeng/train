module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier/react', 'prettier', 'plugin:compat/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  // globals: {
  //   APP_TYPE: true,
  // },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js'],
      },
    ],
    // 'prettier/prettier': 'error',
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/', '^umi/'],
      },
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    // 'linebreak-style': 0,
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
  plugins: ['react', 'jsx-a11y', 'import'], //'react-hooks'
};
