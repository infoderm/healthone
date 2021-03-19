import validateLineLength from './validateLineLength.js';

export default function parseL5(parts, options) {
	validateLineLength(parts, 'L5', 8, options.trailing.L5);

	const {0: descriptor, 1: reference, 2: speciality, 7: text} = parts;

	return {
		descriptor,
		reference,
		speciality,
		text: [text]
	};
}
