import dateFormat from 'date-fns/format';
import dateParseISO from 'date-fns/parseISO';

export default function stringifyTime(datestring, options) {
	const date =
		datestring instanceof Date ? datestring : dateParseISO(datestring);
	const timeString = dateFormat(date, options.timeFormat);

	return timeString === '0000' ? '' : timeString;
}
