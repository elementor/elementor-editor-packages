import breakpointsMap from './maps/breakpoints/breakpoints.js';
import themeColorsMap from './maps/colors/theme-colors';
import tintsMap from './maps/colors/tints';
import spacingMap from './maps/spacing/spacing';

export const breakpoints = breakpointsMap;

export const themeColors = ( key ) => {
	return themeColorsMap[ key ] && themeColorsMap[ key ].hex;
};

export const tints = ( key ) => {
	return tintsMap[ key ] && tintsMap[ key ].hex;
};

export const selectors = {
	base: '_base',
	dark: '.eps-theme-dark',
};

export const spacing = ( key ) => {
	return spacingMap.values[ key ] && ( spacingMap.values[ key ] * spacingMap.base.spacer ) + spacingMap.base.units;
};