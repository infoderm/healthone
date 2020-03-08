import validateLineLength from './validateLineLength';
import validateRequiredField from './validateRequiredField';

import parseDateTime from './parseDateTime';
import parseStatus from './parseStatus';

export default function parseA4(parts) {
	validateLineLength(parts, 'A4', 6);
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
