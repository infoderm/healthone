import dateparse from 'date-fns/parse';

import sliceDate from './sliceDate';

export default function parseDate(datestring) {
	const {year, month, day} = sliceDate(datestring);

	return dateparse(`${year}-${month}-${day}`);
}
