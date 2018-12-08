import fs from 'fs';
import test from 'ava';

import parse from '../../src/parse';

function file(t, filename) {
	const source = fs.readFileSync(`test/data/hlt/${filename}`).toString();
	const expected = JSON.parse(
		fs.readFileSync(`test/data/json/${filename}`).toString()
	);

	for (const document of expected) {
		document.datetime = new Date(document.datetime);
		document.patient.birthdate = new Date(document.patient.birthdate);
	}

	const documents = parse(source);

	t.deepEqual(documents, expected);
}

file.title = (title, filename) => filename;

test(file, '1234567');
test(file, '4848289');
