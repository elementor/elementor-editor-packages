import { exec } from 'shelljs';
import { error, log, success } from '../utils/logs';

export async function lintPhp() {
	log('Start linting php files.');

	const fileDiff = exec(
		'git diff-index --cached --name-only HEAD | grep .php',
		{
			silent: true,
		}
	);

	if (!fileDiff.stdout) {
		log('No files to lint.');

		return;
	}

	const composerExists = exec('which composer', {
		silent: true,
	});

	if (composerExists.code !== 0) {
		error(
			'composer is not exists. please install composer and run `composer install`.'
		);
	}

	const files = fileDiff.stdout.toString().split('\n').join(' ');

	const lint = exec(`composer run lint ${files}`);

	if (lint.code === 1) {
		error('`lint` script is not defined in composer.json file.');
	}

	if (lint.code === 2) {
		error('There are some lint errors, please fix them.', 2);
	}

	success('lint-php passed!');
}
