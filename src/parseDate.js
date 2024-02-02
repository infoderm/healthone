import {parseISO as dateParseISO} from 'date-fns';

import sliceDate from './sliceDate.js';

export default function parseDate(datestring) {
	const {year, month, day} = sliceDate(datestring);

	return dateParseISO(`${year}-${month}-${day}`);
}
