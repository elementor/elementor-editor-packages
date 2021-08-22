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
	base: '_base',
	dark: '.eps-theme-dark',
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

export const getVariant = ( name, variants ) => {
	const componentName = Object.keys( variants )[ 0 ],
		keys = [ selectors.base, name ];

	let style = '';

	keys.forEach( ( key ) => {
		style += variants[ componentName ]?.[ key ] || '';
	} );

	// Dark mode.
	// TODO: read from a proper source.
	if ( document.body.classList.contains( 'eps-theme-dark' ) ) {
		keys.forEach( ( key ) => {
			style += variants[ selectors.dark ]?.[ componentName ]?.[ key ] || '';
		} );
	}

	return css`${ style }`;
};