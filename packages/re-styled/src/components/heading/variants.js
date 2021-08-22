import { themeColors, selectors } from 'styles';

const { base, dark } = selectors;

console.log( 'from variants of re-styles', themeColors );

export default {
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
