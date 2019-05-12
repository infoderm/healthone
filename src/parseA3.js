import validateLineLength from './validateLineLength';

export default function parseA3(parts) {
	validateLineLength(parts, 'A3', [2, 3, 4, 5]);

	const [
		descriptor,
		reference,
		streetandnumber,
		zip,
		municipality
	] = parts.slice(0, -1);

	return {
		descriptor,
		reference,
		patient: {
			streetandnumber,
			zip,
			municipality
		}
	};
}
