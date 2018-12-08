import validateLineLength from './validateLineLength';

export default function parseL5(parts) {
	validateLineLength(parts, 'L5', 8);

	const [descriptor, reference, speciality, , , , , text] = parts;

	return {
		descriptor,
		reference,
		speciality,
		text: [text]
	};
}
