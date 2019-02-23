import fs from 'fs';
import test from 'ava';

import parse from '../../src/parse';

function parseDates(documents) {
	for (const document of documents) {
		document.datetime = new Date(document.datetime);
		document.patient.birthdate = new Date(document.patient.birthdate);
	}
}

function file(t, filename) {
	const source = fs.readFileSync(`test/data/hlt/${filename}`).toString();
	const expected = JSON.parse(
		fs.readFileSync(`test/data/json/${filename}`).toString()
	);

	const documents = JSON.parse(JSON.stringify(parse(source)));

	parseDates(expected);
	parseDates(documents);

	t.deepEqual(expected, documents);
}

file.title = (title, filename) => filename;

const testFileDir = 'test/data/hlt';
const testFiles = fs.readdirSync(testFileDir);
for (const filename of testFiles) {
	test(file, filename);
}
