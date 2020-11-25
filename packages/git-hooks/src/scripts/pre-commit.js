import { lintPhp } from './lint-php';
import { lintJs } from './lint-js';

export async function preCommit() {
	await lintPhp();
	await lintJs();
}
