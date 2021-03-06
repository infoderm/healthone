﻿import stringifyRecord from './stringifyRecord';
import defaultStringifyOptions from './defaultStringifyOptions';
import expandAndMergeOptions from './expandAndMergeOptions';

export default function stringify(records, options) {
	options = expandAndMergeOptions(defaultStringifyOptions, options);
	return [...stringifyRecords(records, options), ''].join(options.newline);
}

function* stringifyRecords(records, options) {
	for (const record of records) {
		for (const line of stringifyRecord(record, options)) {
			yield line.filter((x) => x !== undefined).join(options.separator);
		}
	}

	if (options.end) yield options.end;
}
