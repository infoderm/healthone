import validateLineLength from './validateLineLength.js';
import validateRequiredField from './validateRequiredField.js';

export default function parseA1(parts, options) {
	validateLineLength(parts, 'A1', 3, options.trailing.A1);

	validateRequiredField(parts, 'reference', 2, options.required.reference);

	const [descriptor, reference, identifier] = parts;

	return {
		descriptor,
		reference,
		identifier,
	};
}
