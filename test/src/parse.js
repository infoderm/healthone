import fs from 'node:fs';
import test from 'ava';

import {zip} from '@iterable-iterator/zip';

import {parse} from '#module';

function parseDates(documents) {
	for (const document of documents) {
		document.datetime = new Date(document.datetime);
		document.patient.birthdate = new Date(document.patient.birthdate);
	}
}

function file(t, filename, options) {
	const source = fs.readFileSync(`test/data/input/${filename}`).toString();
	const expectedDocuments = JSON.parse(
		fs.readFileSync(`test/data/json/${filename}`).toString(),
	);

	const documents = JSON.parse(JSON.stringify(parse(source, options)));

	parseDates(expectedDocuments);
	parseDates(documents);

	for (const [document, expectedDocument] of zip(
		documents,
		expectedDocuments,
	)) {
		t.deepEqual(document, expectedDocument);
	}
}

file.title = (title, filename) => title ?? filename;

const testFileDir = 'test/data/input';
const testFiles = fs.readdirSync(testFileDir);
for (const filename of testFiles) {
	const options = {
		nnInA2: /nnInA2/.test(filename),
		trailing: {
			A2: !/ntA2/.test(filename),
			A5: !/ntA5/.test(filename),
			L1: undefined,
		},
		lang: /nl/.test(filename) ? 'nl' : 'fr',
	};
	test(file, filename, options);
}
