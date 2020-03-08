import dateFormat from 'date-fns/format';
import dateParseISO from 'date-fns/parseISO';

export default function stringifyDate(datestring, options) {
	const date =
		datestring instanceof Date ? datestring : dateParseISO(datestring);
	return dateFormat(date, options.dateFormat);
}
