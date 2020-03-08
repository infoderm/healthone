import dateFormat from 'date-fns/format';
import dateParseISO from 'date-fns/parseISO';

export default function stringifyDate(date, options) {
	return dateFormat(dateParseISO(date), options.dateFormat);
}
