module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: [
  ],
  rules: {
    'no-useless-constructor': 0,
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'any'
      },
      svg: 'always',
      math: 'always'
    }]
  }
}
