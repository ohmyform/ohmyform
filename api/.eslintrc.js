module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  'plugins': [
    'nestjs',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'unused-imports'
  ],
  extends: [
    'eslint:recommended',
    'plugin:nestjs/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
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
};
