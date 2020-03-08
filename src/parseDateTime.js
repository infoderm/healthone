import dateParseISO from 'date-fns/parseISO';

import parseDate from './parseDate';
import sliceTime from './sliceTime';
import sliceDate from './sliceDate';

export default function parseDateTime(datestring, timestring) {
	if (!timestring) return parseDate(datestring);

	const {year, month, day} = sliceDate(datestring);
	const {hour, minute} = sliceTime(timestring);

	return dateParseISO(`${year}-${month}-${day}T${hour}:${minute}:00`);
}
