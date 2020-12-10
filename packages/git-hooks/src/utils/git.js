import { exec } from 'shelljs';

/**
 * Get all the staged files.
 *
 * @param {string|null} extension
 * @return {string[]} list of all the staged files.
 */
export function getStagedFiles( extension = null ) {
	let command = 'git diff-index --cached --name-only HEAD';

	if ( extension ) {
		command += ` | grep ${ extension }$`;
	}

	const commandResult = exec( command, { silent: true } );

	if ( ! commandResult.stdout ) {
		return [];
	}

	return commandResult.stdout.toString().split( '\n' );
}
