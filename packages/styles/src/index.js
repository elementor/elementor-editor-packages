const breakpointsMap = require( './maps/breakpoints/breakpoints.js' );
const themeColorsMap = require( './maps/colors/theme-colors' );
const tintsMap = require( './maps/colors/tints' );
const spacingMap = require( './maps/spacing/spacing' );

const data = {
	breakpoints: breakpointsMap,
	themeColors: ( key ) => {
		return themeColorsMap[ key ].hex;
	},
	tints: ( key ) => {
		return tintsMap[ key ].hex;
	},
	selectors: {
		base: '_base',
		dark: '.eps-theme-dark',
	},
	spacing: ( key ) => {
		return spacingMap.values[ key ] && ( spacingMap.values[ key ] * spacingMap.base.spacer ) + spacingMap.base.units;
	}
};

console.log( 'rotem - index - styles ------------------------------- 888', data );

module.exports = data;