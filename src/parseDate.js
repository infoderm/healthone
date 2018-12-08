import dateparse from 'date-fns/parse';

export default function parseDate(datestring) {
	const day = datestring.slice(0, 2);
	const month = datestring.slice(2, 4);
	const year = datestring.slice(4, 8);
	return dateparse(`${year}-${month}-${day}`);
}
