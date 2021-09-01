import { themeColors } from 'styles';

export default {
	_base: `
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
};

export const dark = {
	_base: `
		color: aqua;
	`,
	h1: `
		--color: ${ themeColors( 'warning' ) };
	`,
};