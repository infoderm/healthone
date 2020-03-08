import stringifySex from './stringifySex';
import stringifyDate from './stringifyDate';

export default function stringifyA2(record, options) {
	const {
		reference,
		patient: {nn, lastname, firstname, sex, birthdate}
	} = record;

	const sexstring = stringifySex(sex, options);
	const datestring = stringifyDate(birthdate, options);

	const parts = ['A2', reference, lastname, firstname, sexstring, datestring];

	if (options.nnInA2 && nn) parts.push(nn);

	parts.push('');

	return parts;
}
