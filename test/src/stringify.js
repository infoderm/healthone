import fs from 'fs';
import test from 'ava';

import stringify from '../../src/stringify';
import defaultOptions from '../../src/defaultOptions';

function file(t, filename, options) {
	let expected = fs.readFileSync(`test/data/hlt/${filename}`).toString();
	expected =
		expected.trimStart().trimEnd() +
		(options.newline || defaultOptions.newline);

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
		nnInA2: filename.match(/nnInA2/),
		ntA5: filename.match(/ntA5/),
		lang: filename.match(/nl/) ? 'nl' : 'fr'
	};

	if (filename.match(/yy/)) options.dateFormat = 'ddMMyy';
	if (filename.match(/end/)) options.end = 'END';
	if (filename.match(/cr/)) options.newline = '\r\n';

	test(file, filename, options);
}
