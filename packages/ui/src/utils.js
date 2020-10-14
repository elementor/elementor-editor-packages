export function pxToRem(pixels) {
	if (!pixels) {
		return;
	}

	return `${pixels * 0.0625}rem`;
}

export function arrayToClassName(array) {
	return array.filter((classItem) => '' !== classItem).join(' ');
}

export function stringToRemValues(string) {
	return string
		.split(' ')
		.map((value) => pxToRem(value))
		.join(' ');
}
