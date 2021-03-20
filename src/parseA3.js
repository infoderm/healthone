import validateLineLength from './validateLineLength.js';

export default function parseA3(parts, options) {
	validateLineLength(parts, 'A3', [2, 3, 4, 5], options.trailing.A3);

	const [
		descriptor,
		reference,
		streetandnumber,
		zip,
		municipality,
	] = parts.slice(0, -1);

	return {
		descriptor,
		reference,
		patient: {
			streetandnumber,
			zip,
			municipality,
		},
	};
}
