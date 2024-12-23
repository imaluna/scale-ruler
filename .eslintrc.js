module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    parse: '@babel/eslint-parse',
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    eqeqeq: 'error',
    'prettier/prettier': ['error'],
    'prefer-const': 'error'
  }
};
