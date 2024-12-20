module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: {
        node: true
    },
    rules: {
        // Best practices
        'array-callback-return': [2],
        'block-scoped-var': [2],
        'curly': [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'dot-notation': [2],
        'eqeqeq': [2],
        'no-alert': [2],
        'no-div-regex': [2],
        'no-else-return': [2],
        'no-eq-null': [2],
        'no-eval': [2],
        'no-extend-native': [2],
        'no-extra-bind': [2],
        'no-global-assign': [2],
        'no-implied-eval': [2],
        'no-invalid-this': [2],
        'no-iterator': [2],
        'no-lone-blocks': [2],
        'no-loop-func': [2],
        'no-multi-spaces': [2],
        'no-multi-str': [2],
        'no-new': [2],
        'no-proto': [2],
        'no-return-assign': [2],
        'no-script-url': [2],
        'no-self-compare': [2],
        'no-sequences': [2],
        'no-throw-literal': [2],
        'no-unmodified-loop-condition': [2],
        'no-unused-expressions': [2],
        'no-useless-call': [2],
        'no-useless-concat': [2],
        'no-useless-escape': [2],
        'no-warning-comments': [0],
        'no-with': [2],
        'radix': [2],
        'wrap-iife': [2],
        'yoda': [2],

        // Variables
        'no-catch-shadow': [2],
        'no-shadow': [2],
        'no-undefined': [2],

        // Strict
        'strict': [2, 'never'],

        // Style
        'array-bracket-spacing': [2, 'never'],
        'block-spacing': [2, 'always'],
        'brace-style': [2],
        'camelcase': [2, {
            properties: 'never'
        }],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [2],
        'comma-style': [2],
        'eol-last': [2, 'always'],
        'func-call-spacing': [2, 'never'],
        'indent': [2, 4],
        'jsx-quotes': [2, 'prefer-double'],
        'key-spacing': [2, {
            beforeColon: false,
            afterColon: true,
            mode: 'strict'
        }],
        'keyword-spacing': [2, {
            before: true,
            after: true
        }],
        'linebreak-style': [2, 'unix'],
        'max-len': [2, {
            code: 120,
            tabWidth: 4,
            ignoreUrls: true,
            ignoreStrings: true
        }],
        'new-parens': [2],
        'newline-per-chained-call': [2],
        'no-lonely-if': [2],
        'no-mixed-operators': [2],
        'no-multiple-empty-lines': [2, {
            max: 2,
            maxBOF: 0,
            maxEOF: 0
        }],
        'no-negated-condition': [2],
        'no-tabs': [2],
        'no-trailing-spaces': [2, {skipBlankLines: true}],
        'no-unneeded-ternary': [2],
        'object-curly-spacing': [2],
        'object-property-newline': [2, {
            allowMultiplePropertiesPerLine: true
        }],
        'one-var': [2, 'never'],
        'operator-linebreak': [2, 'after'],
        'quote-props': [2, 'consistent-as-needed'],
        'quotes': [2, 'single', {
            allowTemplateLiterals: true,
            avoidEscape: true
        }],
        'semi': [2, 'always'],
        'semi-spacing': [2],
        'space-before-function-paren': [2, 'always'],
        'space-in-parens': [2],
        'space-infix-ops': [2],
        'space-unary-ops': [2],
        'spaced-comment': [2],
        'arrow-body-style': [2, 'as-needed'],
        'arrow-parens': [2, 'as-needed'],
        'arrow-spacing': [2, {
            before: true,
            after: true
        }],
        'no-prototype-builtins': [2],
        'no-confusing-arrow': [2],
        'no-duplicate-imports': [2],
        'no-return-await': [2],
        'no-template-curly-in-string': [2],
        'no-useless-computed-key': [2],
        'no-useless-constructor': [2],
        'no-useless-rename': [2],
        'no-var': [2],
        'prefer-arrow-callback': [2],
        'prefer-const': [2, {destructuring: 'all'}],
        'prefer-promise-reject-errors': [2],
        'prefer-rest-params': [2],
        'prefer-spread': [2],
        'prefer-template': [2],
        'require-atomic-updates': [2],
        'require-await': [2],
        'rest-spread-spacing': [2, 'never'],
        'symbol-description': [2],
        'template-curly-spacing': [2, 'never'],

        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/no-empty-object-type': [0]
    }
};