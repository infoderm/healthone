import fs from 'fs';
import test from 'ava';

import stringify from '../../src/stringify';

function file(t, filename, options) {
	let expected = fs.readFileSync(`test/data/hlt/${filename}`).toString();
	expected = expected.trimLeft();

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
		lang: filename.match(/nl/) ? 'nl' : 'fr'
	};

	if (filename.match(/yy/)) options.dateFormat = 'DDMMYY';
	if (filename.match(/end/)) options.end = 'END';
	if (filename.match(/cr/)) options.newline = '\r\n';

	test(file, filename, options);
}
