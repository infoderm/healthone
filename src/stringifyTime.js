import dateformat from 'date-fns/format';

export default function stringifyTime(date, options) {
	const timeString = dateformat(date, options.timeFormat);

	return timeString === '0000' ? '' : timeString;
}
