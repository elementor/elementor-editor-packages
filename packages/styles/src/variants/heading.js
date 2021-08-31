import { themeColors } from '../index';

export default {
	heading: {
		default: `
			display: inline-flex;
			font-size: 17px;
			font-weight: bold;
			line-height: 1;
			cursor: pointer;
			border-color: grey;
			color: ${ themeColors( 'info' ) };
		`,
		h1: `
			color: ${ themeColors( 'primary' ) };
		`,
	},
};
