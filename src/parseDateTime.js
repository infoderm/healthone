import {parseISO as dateParseISO} from 'date-fns';

import parseDate from './parseDate.js';
import sliceTime from './sliceTime.js';
import sliceDate from './sliceDate.js';

export default function parseDateTime(datestring, timestring) {
	if (!timestring) return parseDate(datestring);

	const {year, month, day} = sliceDate(datestring);
	const {hour, minute} = sliceTime(timestring);

	return dateParseISO(`${year}-${month}-${day}T${hour}:${minute}:00`);
}
