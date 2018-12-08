import validateLineLength from './validateLineLength';
import validateRequiredField from './validateRequiredField';

import parseDateTime from './parseDateTime';

export default function parseA4(parts) {
	validateLineLength(parts, 'A4', 6);
	validateRequiredField(parts, 'date', 4);
	validateRequiredField(parts, 'status', 6);

	const [descriptor, reference, requestor, date, time, status] = parts;

	const datetime = parseDateTime(date, time);

	return {
		descriptor,
		reference,
		requestor,
		datetime,
		status
	};
}
