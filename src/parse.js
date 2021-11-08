import {count} from '@iterable-iterator/cardinality';
import {filter} from '@iterable-iterator/filter';
import {enumerate} from '@iterable-iterator/zip';

import defaultParseOptions from './defaultParseOptions.js';
import expandAndMergeOptions from './expandAndMergeOptions.js';

import parseRecord from './parseRecord.js';
import insertRecord from './insertRecord.js';
import insertLine from './insertLine.js';

export default function parse(string, options) {
	options = expandAndMergeOptions(defaultParseOptions, options);
	const lines = string.match(options.newline);
	return Array.from(parseLines(lines, options));
}

function* parseLines(lines, options) {
	let report = null;

	for (const [lineno, line] of enumerate(lines, 1)) {
		const parts = line.split(options.separator);

		if (
			parts.length === 1 &&
			options.end.constructor.prototype === String.prototype
		)
			if (parts[0] === options.end) break;
			else if (options.end === undefined) break; // Accept any ending

		if (parts.length < 3) {
			throw new Error(
				`Line ${lineno} consists of less than three parts separated by '\\'`,
			);
		}

		const record = parseRecord(parts, options);

		if (record.descriptor === 'A1') {
			if (report !== null) yield sanitizeReport(report);
			report = {...record, lines: [line]};
		} else if (report === null) {
			throw new Error(`Document did not start with 'A1\\': ${lineno}`);
		} else {
			report = insertRecord(report, record);
			report = insertLine(report, line);
		}
	}

	if (report !== null) yield sanitizeReport(report);
}

function sanitizeReport(report) {
	if (report.kind === 'lab') {
		return {
			...report,
			anomalies: count(filter((result) => result.flag === '*', report.results)),
		};
	}

	return report;
}
