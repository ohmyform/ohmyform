module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'unused-imports'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'array-element-newline': ['error', {
      'ArrayExpression': 'consistent',
      'ArrayPattern': {
        'minItems': 3,
        'multiline': true,
      }
    }],
    'array-bracket-newline': ['error', {
      'minItems': 3,
      'multiline': true,
    }],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'no-tabs': ['error'],
    'max-len': ['error', {
      'code': 100,
      'ignoreComments': true,
      'ignoreUrls': true,
      'ignoreTemplateLiterals': true,
      'ignoreTrailingComments': true,
      'ignoreStrings': true,
    }],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
