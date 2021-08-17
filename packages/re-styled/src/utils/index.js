import { css } from 'styled-components';

// Maps.
import breakpointsMap from './maps/breakpoints/breakpoints.js';
import themeColorsMap from './maps/colors/theme-colors';
import tintsMap from './maps/colors/tints';
import spacingMap from './maps/spacing/spacing';

export const breakpoints = breakpointsMap;

export const themeColors = ( key ) => {
	return themeColorsMap[ key ].hex;
};

export const tints = ( key ) => {
	return tintsMap[ key ].hex;
};

export const selectors = {
	dark: '.eps-theme-dark',
	ltr: ':not([dir=rtl])',
	rtl: '[dir=rtl]',
};

export const spacing = ( key ) => {
	return spacingMap.values[ key ] && ( spacingMap.values[ key ] * spacingMap.base.spacer ) + spacingMap.base.units;
};

const bindProp = ( obj ) => {
	const [ key, value ] = Object.entries( obj )[ 0 ];

	return value && css`
			${ key }: ${ value };
		`;
};

export const bindProps = ( data ) => {
	if ( ! Array.isArray( data ) ) {
		data = [ data ];
	}

	return data.map( ( obj ) => bindProp( obj ) );
};

export const getVariant = ( variant, propValue ) => {
	const variantData = variant,
		variantName = variant.toLowerCase(),
		variantObj = variantData[ variantName ];

	if ( ! variantObj ) {
		return '';
	}

	const darkObj = variantData[ selectors.dark ][ variantName ],
		ltrObj = variantData[ selectors.ltr ][ variantName ],
		rtlObj = variantData[ selectors.rtl ][ variantName ],
		isDarkMode = document.body.classList.contains( 'eps-theme-dark' ), // TODO: read from a proper source
		isRtlMode = 'rtl' === getComputedStyle( document.body ).direction; // TODO: read from a proper source

	if ( ! propValue ) {
		let defaultStyle = '';

		defaultStyle += variantObj.default;

		if ( isDarkMode && darkObj ) {
			defaultStyle += darkObj.default;
		}

		if ( isRtlMode && rtlObj ) {
			defaultStyle += rtlObj.default;
		} else if ( ltrObj ) {
			defaultStyle += ltrObj.default;
		}

		return defaultStyle;
	}

	const variantStyle = variantObj?.[ propValue ],
		darkStyle = darkObj?.[ propValue ],
		ltrStyle = ltrObj?.[ propValue ],
		rtlStyle = rtlObj?.[ propValue ];

	if ( variantStyle ) {
		let cssString = variantStyle;

		if ( isDarkMode && darkStyle ) {
			cssString += darkStyle;
		}

		if ( isRtlMode && rtlStyle ) {
			cssString += rtlStyle;
		} else if ( ltrStyle ) {
			cssString += ltrStyle;
		}

		return css`${ cssString }`;
	}
};