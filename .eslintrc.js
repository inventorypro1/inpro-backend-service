module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: 'off',
    'padded-blocks': 'off',
    'prefer-destructuring': 'off',
    'comma-dangle': [
      'error',
      'never'
    ],
    'max-len': [
      'error',
      {
        code: 130,
        comments: 130,
        ignoreTrailingComments: true,
        ignoreComments: true
      }
    ],
    'import/newline-after-import': 'off',
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'no-underscore-dangle': 'off',
    'brace-style': ['error', 'stroustrup']
  }
};
