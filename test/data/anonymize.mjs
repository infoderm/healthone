import 'regenerator-runtime/runtime.js';

import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';

import chardet from 'chardet';
import iconv from 'iconv-lite';

import {parse, stringify, anonymize} from '../../src/index.js';

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
