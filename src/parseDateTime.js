import dateparse from 'date-fns/parse';

import parseDate from './parseDate';
import sliceTime from './sliceTime';
import sliceDate from './sliceDate';

export default function parseDateTime(datestring, timestring) {
	if (!timestring) return parseDate(datestring);

	const {year, month, day} = sliceDate(datestring);
	const {hour, minute} = sliceTime(timestring);

	return dateparse(`${year}-${month}-${day}T${hour}:${minute}:00`);
}
