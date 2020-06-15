import fs from 'fs';
import test from 'ava';

import stringify from '../../src/stringify';
import defaultStringifyOptions from '../../src/defaultStringifyOptions';

function file(t, filename, options) {
	let expected = fs.readFileSync(`test/data/output/${filename}`).toString();
	expected =
		expected.trimStart().trimEnd() +
		(options.newline || defaultStringifyOptions.newline);

	const json = JSON.parse(
		fs.readFileSync(`test/data/json/${filename}`).toString()
	);

	const text = stringify(json, options);

	t.deepEqual(expected, text);
}

file.title = (title, filename) => filename;

const testFileDir = 'test/data/json';
const testFiles = fs.readdirSync(testFileDir);
for (const filename of testFiles) {
	const options = {
		nnInA2: /nnInA2/.test(filename),
		trailing: {
			A2: !/ntA2/.test(filename),
			A5: !/ntA5/.test(filename)
		},
		lang: /nl/.test(filename) ? 'nl' : 'fr',
		timeZone: 'Europe/Copenhagen'
	};

	if (/yy/.test(filename)) options.dateFormat = 'ddMMyy';
	if (/end/.test(filename)) options.end = 'END';
	if (/cr/.test(filename)) options.newline = '\r\n';

	test(file, filename, options);
}
