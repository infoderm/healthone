import {format as dateFormat, parseISO as dateParseISO} from 'date-fns';

export default function stringifyTime(datestring, options) {
	const date =
		datestring instanceof Date ? datestring : dateParseISO(datestring);
	const timeString = dateFormat(date, options.timeFormat);

	return timeString === '0000' ? '' : timeString;
}
