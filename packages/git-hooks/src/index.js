#!/usr/bin/env node

import { kebabCase } from 'lodash';
import * as scripts from './scripts';
import { error } from './utils/logs';

const optionalScripts = Object.entries( scripts ).reduce(
	( current, [ key, script ] ) => {
		return {
			...current,
			[ kebabCase( key ) ]: script,
		};
	},
	{}
);

const args = process.argv.slice( 2 );
const scriptName = args[ 0 ];

if ( ! scriptName ) {
	error(
		'Argument "script" is required (example: "elementor-git-hooks pre-commit")'
	);
}

if ( ! optionalScripts.hasOwnProperty( scriptName ) ) {
	error( `The script ${ scriptName } is not exists.` );
}

optionalScripts[ scriptName ]();
