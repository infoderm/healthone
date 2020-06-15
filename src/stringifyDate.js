import dateFormat from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import dateParseISO from 'date-fns/parseISO';

export default function stringifyDate(datestring, options) {
	const date = utcToZonedTime(
		datestring instanceof Date ? datestring : dateParseISO(datestring),
		options.timeZone
	);
	return dateFormat(date, options.dateFormat, {timeZone: options.timeZone});
}
