import { themeColors, selectors } from 'styles';

const { base } = selectors;


export default {
	button: {
		[ base ]: `
			display: inline-flex;
			font-size: 16px;
			font-weight: bold;
			line-height: 1;
			cursor: pointer;
			background-color: ${ themeColors( 'primary' ) };
			color: #fff;
		`,
	}
};
