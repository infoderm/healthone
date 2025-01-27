import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';

// eslint-disable-next-line import/no-unassigned-import
import 'regenerator-runtime/runtime.js';
import chardet from 'chardet';
import iconv from 'iconv-lite';
import {faker} from '@faker-js/faker';
import {format as dateformat} from 'date-fns';

import {parse, stringify} from '../../src/index.js';

const AGE_MAX = 93;
const SEX_ALLOWED = ['male', 'female'];

function fakenn(birthdate, sex) {
	const yymmdd = Number.parseInt(dateformat(birthdate, 'yyMMdd'), 10);
	const xxx =
		faker.number.int({min: 0, max: 499}) * 2 + (sex === 'male' ? 1 : 0);
	const yymmddxxx = yymmdd * 1000 + xxx;
	const _cd = yymmddxxx % 97;
	const cd = _cd === 0 ? 97 : _cd;
	const yymmddxxxcd = yymmddxxx * 100 + cd;
	const nn = String(yymmddxxxcd).padStart(11, '0');
	return nn;
}

function anonymize(document) {
	document.identifier = faker.company.name();
	document.reference = String(
		faker.number.int({min: 10_000_000, max: 99_999_999}),
	);
	document.requestor = faker.person.lastName();

	document.patient.lastname = faker.person.lastName();
	document.patient.firstname = faker.person.firstName();
	document.patient.sex = faker.helpers.arrayElement(SEX_ALLOWED);
	document.patient.birthdate = faker.date.past({years: AGE_MAX});
	document.patient.municipality = faker.location.city();
	document.patient.streetandnumber = faker.location.streetAddress();
	document.patient.zip = faker.location.zipCode();
	document.patient.nn = fakenn(
		document.patient.birthdate,
		document.patient.sex,
	);

	if (document.mutuality) {
		document.mutuality.id = String(faker.number.int({min: 0, max: 999}));
		document.mutuality.coverage = '';
		document.mutuality.holder = '';
		document.mutuality.kg1 = String(faker.number.int({min: 0, max: 999}));
		document.mutuality.kg2 = String(faker.number.int({min: 0, max: 999}));
	}
}

function anonymizeFile(filepath, options, outfilepath) {
	const array = fs.readFileSync(filepath);
	// Const source = array.toString();
	const encoding = chardet.detect(array).toLowerCase();
	// Const encoding = 'ibm850';
	const source = iconv.decode(array, encoding);
	const documents = parse(source);
	for (const document of documents) {
		anonymize(document);
	}

	const modified = stringify(documents, options);
	fs.writeFileSync(outfilepath, modified);
}

const testFiles = process.argv.slice(2);
for (const filepath of testFiles) {
	const filename = path.basename(filepath);

	const options = {
		nnInA2: /nnInA2/.test(filename),
		trailing: {
			A2: !/ntA2/.test(filename),
			A5: !/ntA5/.test(filename),
			L1: undefined,
		},
		lang: /nl/.test(filename) ? 'nl' : 'fr',
	};

	if (/yy/.test(filename)) {
		options.dateFormat = 'ddMMyy';
	}

	if (/end/.test(filename)) {
		options.end = 'END';
	}

	if (/cr/.test(filename)) {
		options.newline = '\r\n';
	}

	const outfilepath = `input/${filename}`;
	anonymizeFile(filepath, options, outfilepath);
}
