module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true // https://eslint.vuejs.org/user-guide/#compiler-macros-such-as-defineprops-and-defineemits-generate-no-undef-warnings
  },
  // parserOptions: {
  //   ecmaVersion: 2021
  // },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    project: ['tsconfig.json']
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    './.eslintrc-auto-import.json',
    '@vue/prettier'
  ],

  plugins: ['unicorn'],
  rules: {
    //  Project|Vue3 Rules
    //  --------------
    '@typescript-eslint/no-unused-vars': 'error', // Will be triggered for vars unused in the template/script
    '@typescript-eslint/no-explicit-any': 'off', //Should be removed after rebuild when we have everything typed
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'none',
        vueIndentScriptAndStyle: true,
        endOfLine: 'auto',
        printWidth: 120
      }
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        ignores: ['/^el-/', '/^router-/', '/^font-awesome-/', '/^transition/'],
        registeredComponentsOnly: false
      }
    ],
    'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        }
      }
    ],

    //  Eslint-Config Base Rules
    //  --------------

    // #region Best Practices
    eqeqeq: 'error',
    'no-useless-concat': 'error',
    'no-unused-expressions': 'error',
    'prefer-promise-reject-errors': [
      'error',
      {
        allowEmptyReject: true
      }
    ],
    radix: 'error',
    'no-new-wrappers': 'error',
    // #endregion

    // #region Possible Errors
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // #endregion

    //  Eslint-Config Vue Rules
    //  --------------

    // #region Strongly Recommended
    'vue/attribute-hyphenation': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/v-slot-style': 'error',
    // #endregion

    // #region Recommended
    'vue/no-lone-template': 'error',
    'vue/this-in-template': 'error',
    // #endregion

    // #region Uncategorized
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/html-comment-indent': ['error', 2],
    'vue/no-useless-mustaches': 'error',
    'vue/padding-line-between-blocks': 'error',
    // #endregion

    // #region Extension Rules
    'vue/dot-notation': 'error',
    'vue/eqeqeq': 'error',
    'vue/no-empty-pattern': 'error',
    'vue/no-irregular-whitespace': 'error',
    'vue/no-sparse-arrays': 'error',
    'vue/no-useless-concat': 'error',
    'vue/prefer-template': 'error',
    // #endregion

    //  Eslint-Config Unicorn Rules
    //  --------------
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-hex-escape': 'error',
    // 'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-text-content': 'error',
    'unicorn/throw-new-error': 'error',

    //  Eslint-Config TypeScript
    //  --------------

    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreIIFE: true
      }
    ],

    // #region Stylistic
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // #endregion

    // #region Extension Rules
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',

    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'error',
    // #endregion

    // #region Possible Errors
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
    // #endregion

    // #region Best Practices
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',

    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'error',

    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': 'error',

    // MAYBE?
    // 'no-magic-numbers': 'off',
    // '@typescript-eslint/no-magic-numbers': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'error',

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    // #endregion

    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',

    camelcase: 'off',
    // TODO [2022-02-15] Required to be enabled! Rework the TS models for Pagination, Sort, etc. to support camel-case and recast specifically for a BE-type model to support snake_case
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'interface',
    //     format: ['PascalCase']
    //   },
    //   {
    //     selector: 'class',
    //     format: ['PascalCase']
    //   },
    //   {
    //     selector: 'enum',
    //     format: ['PascalCase']
    //   },
    //   {
    //     selector: 'method',
    //     format: ['camelCase', 'PascalCase']
    //   },
    //   {
    //     selector: 'property',
    //     format: ['camelCase', 'snake_case']
    //   },
    //   {
    //     selector: 'variable',
    //     format: ['camelCase', 'PascalCase']
    //   },
    //   {
    //     selector: 'variable',
    //     types: ['boolean'],
    //     format: ['PascalCase'],
    //     prefix: ['is', 'should', 'has', 'can', 'did', 'will']
    //   },
    //   {
    //     selector: 'parameter',
    //     format: ['camelCase'],
    //     leadingUnderscore: 'allow'
    //   },
    //   {
    //     selector: 'memberLike',
    //     modifiers: ['private'],
    //     format: ['camelCase'],
    //     leadingUnderscore: 'require'
    //   },
    //   {
    //     selector: 'typeLike',
    //     format: ['PascalCase']
    //   }
    // ],

    // #region Variables
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    'no-use-before-define': 'off',
    // #endregion

    //  Eslint-Config Local Ovwerwites
    //  --------------
    '@typescript-eslint/no-use-before-define': 'off' //Disable as we primarily see it as a irritating issue
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ],
  ignorePatterns: ['.eslintrc.js', 'windi.config.ts', 'vite.config.ts', 'generateToken.js']
};
