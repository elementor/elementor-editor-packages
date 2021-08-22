import { themeColors, selectors } from '@elementor/styles';

const { base, dark } = selectors;

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
