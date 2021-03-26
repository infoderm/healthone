import dateFormat from "date-fns/format/index.js";
import dateParseISO from "date-fns/parseISO/index.js";

export default function stringifyDate(datestring, options) {
	const date =
		datestring instanceof Date ? datestring : dateParseISO(datestring);
	return dateFormat(date, options.dateFormat);
}
