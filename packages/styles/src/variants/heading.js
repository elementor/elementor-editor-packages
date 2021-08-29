const { themeColors, selectors } = require( '../index' );

const { base, dark } = selectors;

module.exports = {
	heading: {
		[ base ]: `
			color: var(--color);
		`,
		h1: `
			--color: ${ themeColors( 'primary' ) };
		`,
		h2: `
			--color: ${ themeColors( 'danger' ) };

			@media screen and (max-width: 960px) {
				color: blue;
			}
		`,
	},
	[ dark ]: {
		heading: {
			h1: `
				--color: ${ themeColors( 'info' ) };
			`,
		},
	},
};
