import validateLineLength from './validateLineLength.js';
import validateRequiredField from './validateRequiredField.js';

import parseDateTime from './parseDateTime.js';
import parseStatus from './parseStatus.js';

export default function parseA4(parts, options) {
	validateLineLength(parts, 'A4', 6, options.trailing.A4);
	validateRequiredField(parts, 'date', 4);

	const [descriptor, reference, requestor, date, time, statusString] = parts;

	const datetime = parseDateTime(date, time);
	const status = parseStatus(statusString);

	return {
		descriptor,
		reference,
		requestor,
		datetime,
		status
	};
}
