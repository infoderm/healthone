import validateLineLength from './validateLineLength';

export default function parseL5(parts) {
	validateLineLength(parts, 'L5', 8);

	const {0: descriptor, 1: reference, 2: speciality, 7: text} = parts;

	return {
		descriptor,
		reference,
		speciality,
		text: [text]
	};
}
