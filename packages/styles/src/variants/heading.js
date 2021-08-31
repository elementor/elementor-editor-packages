import { themeColors, selectors } from 'styles';

const { base, dark } = selectors;

export default {
	heading: {
		[ base ]: `
			color: #ccc;
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
	[ dark ]: {
		heading: {
			h1: `
				--color: ${ themeColors( 'warning' ) };
			`,
		}
	},
};
