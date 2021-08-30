const breakpointsMap = require( './maps/breakpoints/breakpoints.js' );
const themeColorsMap = require( './maps/colors/theme-colors' );
const tintsMap = require( './maps/colors/tints' );
const spacingMap = require( './maps/spacing/spacing' );

console.log( 'rotem - index - styles ------------------------------- 444' );

console.log( 'breakpointsMap', breakpointsMap );

exports.breakpoints = breakpointsMap;

exports.themeColors = ( key ) => {
	return themeColorsMap[ key ].hex;
};

exports.tints = ( key ) => {
	return tintsMap[ key ].hex;
};

exports.selectors = {
	base: '_base',
	dark: '.eps-theme-dark',
};

exports.spacing = ( key ) => {
	return spacingMap.values[ key ] && ( spacingMap.values[ key ] * spacingMap.base.spacer ) + spacingMap.base.units;
};