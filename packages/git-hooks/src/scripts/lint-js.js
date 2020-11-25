import { error, log, success } from '../utils/logs';
import { getStagedFiles } from '../utils/git';
import { exec } from 'shelljs';

export async function lintJs() {
	log( 'Start linting js files.' );

	const stagedFiles = getStagedFiles( 'js' );

	if ( ! stagedFiles.length ) {
		log( 'No files to lint.' );

		return;
	}

	const composerExists = exec( 'which npm', {
		silent: true,
	} );

	if ( composerExists.code !== 0 ) {
		error( 'npm is not exists. please install npm and run `npm install`.' );
	}

	const files = stagedFiles.join( ' ' );

	const lint = exec( `npm run lint -- ${ files }` );

	if ( lint.code === 1 ) {
		if ( lint.stderr.search( /missing script:/ ) >= 0 ) {
			error( '`lint` script is not defined in packages.json file.' );
		}

		error( 'There are some lint errors, please fix them' );
	}

	success( 'lint-js passed!' );
}
