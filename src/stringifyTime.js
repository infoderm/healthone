import dateFormat from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import dateParseISO from 'date-fns/parseISO';

export default function stringifyTime(datestring, options) {
	const date = utcToZonedTime(
		datestring instanceof Date ? datestring : dateParseISO(datestring),
		options.timeZone
	);
	const timeString = dateFormat(date, options.timeFormat, {
		timeZone: options.timeZone
	});

	return timeString === '0000' ? '' : timeString;
}
