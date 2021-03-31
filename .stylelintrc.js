module.exports = {
  'extends': 'stylelint-prettier/recommended',
  'plugins': ['stylelint-prettier', 'stylelint-scss'],
  // 'syntax': 'scss',
  'rules': {
    'prettier/prettier': true,
    'at-rule-no-unknown': [ true, {
      ignoreAtRules: [
        // tailwind
        'tailwind',
        // scss
        'at-root',
        'content',
        'debug',
        'each',
        'else',
        'error',
        'extend',
        'for',
        'function',
        'if',
        'include',
        'mixin',
        'return',
        'warn',
        'while',
      ]
    }],
    // 'scss/at-rule-no-unknown': true,
    'block-no-empty': null,
    'unit-whitelist': ['em', 'rem', '%', 'px', 'fr', 's', 'vh']
  }
}