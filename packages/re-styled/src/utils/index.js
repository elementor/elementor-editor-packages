import { css } from 'styled-components';
import { selectors } from 'styles';

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