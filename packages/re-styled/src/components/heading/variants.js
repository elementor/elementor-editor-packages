import { themeColors, selectors } from 'utils';

export default {
	heading: {
		default: `
			color: blue;
		`,
		h1: `
			--color: ${ themeColors( 'primary' ) };
			color: var(--color);
			--start-spacing: 90px;
		`,
		h2: `
			color: ${ themeColors( 'info' ) };

			@media screen and (max-width: 960px) {
				color: blue;
			}
		`,
	},
	[ selectors.dark ]: {
		heading: {
			h1: `
				--color: ${ themeColors( 'info' ) };
			`,
		},
	},
};
