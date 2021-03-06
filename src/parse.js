﻿import {count} from '@aureooms/js-cardinality';
import {filter, enumerate} from '@aureooms/js-itertools';

import defaultParseOptions from './defaultParseOptions';
import expandAndMergeOptions from './expandAndMergeOptions';

import parseRecord from './parseRecord';
import insertRecord from './insertRecord';
import insertLine from './insertLine';

export default function parse(string, options) {
	options = expandAndMergeOptions(defaultParseOptions, options);
	const lines = string.match(options.newline);
	return [...parseLines(lines, options)];
}

function* parseLines(lines, options) {
	let report = null;

	for (const [lineno, line] of enumerate(lines, 1)) {
		const parts = line.split(options.separator);

		if (parts.length === 1) {
			if (options.end.constructor.prototype === String.prototype)
				if (parts[0] === options.end) break;
				else if (options.end === undefined) break; // Accept any ending
		}

		if (parts.length < 3) {
			throw new Error(
				`Line ${lineno} consists of less than three parts separated by '\\'`
			);
		}

		const record = parseRecord(parts, options);

		if (record.descriptor === 'A1') {
			if (report !== null) yield sanitizeReport(report);
			report = {...record, source: [line]};
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
			anomalies: count(filter((result) => result.flag === '*', report.results))
		};
	}

	return report;
}
