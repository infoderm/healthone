import dateformat from 'date-fns/format';

export default function stringifyDate(date, options) {
	return dateformat(date, options.dateFormat);
}
