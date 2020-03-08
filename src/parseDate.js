import dateParseISO from 'date-fns/parseISO';

import sliceDate from './sliceDate';

export default function parseDate(datestring) {
	const {year, month, day} = sliceDate(datestring);

	return dateParseISO(`${year}-${month}-${day}`);
}
