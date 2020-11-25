import chalk from 'chalk';

export function error( message, code = 1 ) {
	// eslint-disable-next-line no-console
	console.error( chalk.white.bgRed.bold( message ) );

	exit( code );
}

export function success( message ) {
	log( chalk.green.bold( message ) );
}

export function log( message ) {
	// eslint-disable-next-line no-console
	console.log( message );
}

export function exit( code = 0 ) {
	process.exit( code );
}
