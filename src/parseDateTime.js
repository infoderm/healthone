import toDate from 'date-fns-tz/toDate';

import parseDate from './parseDate';
import sliceTime from './sliceTime';
import sliceDate from './sliceDate';

export default function parseDateTime(datestring, timestring, options) {
	if (!timestring) return parseDate(datestring);

	const {year, month, day} = sliceDate(datestring);
	const {hour, minute} = sliceTime(timestring);

	return toDate(`${year}-${month}-${day}T${hour}:${minute}:00`, {
		timeZone: options.timeZone
	});
}
