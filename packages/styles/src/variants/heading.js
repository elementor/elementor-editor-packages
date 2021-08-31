import { themeColors, selectors } from 'styles';

console.log( 'themeColors', themeColors );
console.log( 'selectors', selectors );

const { base, dark } = selectors;

console.log( 'base', base );
console.log( 'dark', dark );

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
