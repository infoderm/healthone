import dateFormat from "date-fns/format/index.js";
import dateParseISO from "date-fns/parseISO/index.js";

export default function stringifyTime(datestring, options) {
	const date =
		datestring instanceof Date ? datestring : dateParseISO(datestring);
	const timeString = dateFormat(date, options.timeFormat);

	return timeString === '0000' ? '' : timeString;
}
