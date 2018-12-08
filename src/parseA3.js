import validateLineLength from './validateLineLength';

export default function parseA3(parts) {
	validateLineLength(parts, 'A3', 5);

	const [descriptor, reference, streetandnumber, zip, municipality] = parts;

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
