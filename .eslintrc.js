const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    ...(strictEslint.rules || {}),
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
      },
    ],
    'no-unused-expressions': 0,
    'jsx-a11y/control-has-associated-label': 'off',
    // 禁用未使用过的标签
    'no-unused-labels': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
  },

  globals: {
    page: true,
    REACT_APP_ENV: false,
  },
};
