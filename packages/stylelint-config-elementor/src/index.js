module.exports = {
	extends: [ 'stylelint-config-standard', 'stylelint-config-sass-guidelines' ],
	namingPattern: /^-?[a-z0-9]+(-[a-z0-9]+)*$/, // lowercase-single-dashed-names-only-0.
	plugins: [ 'stylelint-scss' ],
	rules: {
		'color-no-hex': true,
		indentation: 'tab',
		'length-zero-no-unit': true,
		'max-nesting-depth': {
			ignore: [ 'blockless-at-rules' ],
		},
		'no-empty-first-line': true,
		'no-missing-end-of-source-newline': true,
		'number-leading-zero': 'always',
		'order/properties-alphabetical-order': false,
		'rule-empty-line-before': 'always',
		'selector-attribute-quotes': 'always',
		'selector-max-id': 1,
		'scss/at-function-named-arguments': false,
		'scss/at-function-pattern': false,
		'scss/selector-no-redundant-nesting-selector': false,
		'string-quotes': 'single',
	},
};
