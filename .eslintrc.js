module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: { 'react/prop-types': 'off' },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: { impliedStrict: true, classes: true },
  },
  plugins: ['prettier', 'react-hooks', '@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: { every: ['id'] },
        allowChildren: false,
      },
    ],
    'newline-after-var': 2,
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
    'no-use-before-define': 'off',
    'prettier/prettier': ['error', { trailingComma: 'es5', singleQuote: true, printWidth: 120 }],
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/no-multi-comp': 0,
    'template-curly-spacing': 0,
  },
  settings: {
    'import/resolver': {
      node: { paths: ['src'] },
    },
  },
};
