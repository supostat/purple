module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],

  plugins: ['flowtype', 'flowtype-errors', 'prettier', 'import'],

  globals: {
    __DEV__: true,
    System: true,
  },

  env: {
    browser: true,
  },

  rules: {
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'flowtype-errors/show-errors': 2,
    'flowtype-errors/enforce-min-coverage': [2, 30],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    // https://eslint.org/docs/rules/no-console
    'no-console': 'off',

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],

    // Allow .js files to use JSX syntax
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    // Functional and class components are equivalent from React’s point of view
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': 'off',

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': 'error',
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
      'babel-plugin-root-import': {}
    },
  },
};
