module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'prefer-rest-params': 'off',
    'no-unused-expressions':'off',
    'no-extend-native': 'off',
    'vars-on-top':'off',
    'no-var':'off',
    'no-loop-func':'off',
    'no-shadow':'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off'
  },
};
