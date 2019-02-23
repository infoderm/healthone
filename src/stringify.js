import stringifyRecord from './stringifyRecord';
import defaultOptions from './defaultOptions';

export default function stringify(records, options) {
	options = Object.assign({}, defaultOptions, options);
	return [...stringifyRecords(records, options), ''].join('\n');
}

function* stringifyRecords(records, options) {
	for (const record of records) {
		for (const line of stringifyRecord(record, options)) {
			yield line.join(options.separator) + options.separator;
		}
	}

	if (options.end) yield options.end;
}
