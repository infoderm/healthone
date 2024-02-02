import {format as dateFormat, parseISO as dateParseISO} from 'date-fns';

export default function stringifyDate(datestring, options) {
	const date =
		datestring instanceof Date ? datestring : dateParseISO(datestring);
	return dateFormat(date, options.dateFormat);
}
