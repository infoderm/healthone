import dateparse from 'date-fns/parse';

import parseDate from './parseDate';

export default function parseDateTime(date, time) {
	if (!time) return parseDate(date);

	const day = date.slice(0, 2);
	const month = date.slice(2, 4);
	const year = date.slice(4, 8);
	const hour = time.slice(0, 2);
	const minute = time.slice(2, 4);

	return dateparse(`${year}-${month}-${day}T${hour}:${minute}:00`);
}
