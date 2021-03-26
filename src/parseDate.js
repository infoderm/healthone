import dateParseISO from 'date-fns/parseISO/index.js';

import sliceDate from './sliceDate.js';

export default function parseDate(datestring) {
	const {year, month, day} = sliceDate(datestring);

	return dateParseISO(`${year}-${month}-${day}`);
}
