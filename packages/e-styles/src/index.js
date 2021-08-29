const breakpointsMap = require( './maps/breakpoints/breakpoints.js' );
const themeColorsMap = require( './maps/colors/theme-colors' );
const tintsMap = require( './maps/colors/tints' );
import spacingMap from './maps/spacing/spacing';

console.log( 'rotem456' );

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