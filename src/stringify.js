import stringifyRecord from './stringifyRecord.js';
import defaultStringifyOptions from './defaultStringifyOptions.js';
import expandAndMergeOptions from './expandAndMergeOptions.js';

export default function stringify(records, options) {
	options = expandAndMergeOptions(defaultStringifyOptions, options);
	const lines = Array.from(stringifyRecords(records, options));
	lines.push(''); // For trailing newline
	return lines.join(options.newline);
}

function* stringifyRecords(records, options) {
	for (const record of records) {
		for (const line of stringifyRecord(record, options)) {
			yield line.filter((x) => x !== undefined).join(options.separator);
		}
	}

	if (options.end) yield options.end;
}
