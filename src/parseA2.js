import validateLineLength from './validateLineLength';
import validateRequiredField from './validateRequiredField';

import parseSex from './parseSex';
import parseDate from './parseDate';

export default function parseA2(parts) {
	validateLineLength(parts, 'A2', 6);

	validateRequiredField(parts, 'lastname', 2);
	validateRequiredField(parts, 'firstname', 3);
	validateRequiredField(parts, 'sex', 4);
	validateRequiredField(parts, 'birthdate', 5);

	const [
		descriptor,
		reference,
		lastname,
		firstname,
		sexstring,
		datestring
	] = parts;

	const sex = parseSex(sexstring);
	const birthdate = parseDate(datestring);

	return {
		descriptor,
		reference,
		patient: {
			lastname,
			firstname,
			sex,
			birthdate
		}
	};
}
