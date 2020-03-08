import stringifyDate from './stringifyDate';
import stringifyTime from './stringifyTime';
import stringifyStatus from './stringifyStatus';

export default function stringifyA4(record, options) {
	const {reference, requestor, datetime, status} = record;

	const date = stringifyDate(datetime, options);
	const time = stringifyTime(datetime, options);
	const statusString = stringifyStatus(status, options);

	return ['A4', reference, requestor, date, time, statusString, ''];
}
