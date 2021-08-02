require('@babel/polyfill');

const fs = require('fs');
const path = require('path');

const chardet = require('chardet');
const iconv = require('iconv-lite');

const {parse, stringify, anonymize} = require('../../src/index.js');

function anonymizeFile(filepath, options) {
	const filename = path.basename(filepath);
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
	fs.writeFileSync(`input/${filename}`, modified);
}

const testFiles = process.argv.slice(2);
for (const filepath of testFiles) {
	const options = {
		nnInA2: /nnInA2/.test(filepath),
		trailing: {
			A5: !/ntA5/.test(filepath),
		},
		lang: /nl/.test(filepath) ? 'nl' : 'fr',
	};

	if (/yy/.test(filepath)) {
		options.dateFormat = 'ddMMyy';
	}

	if (/end/.test(filepath)) {
		options.end = 'END';
	}

	if (/cr/.test(filepath)) {
		options.newline = '\r\n';
	}

	anonymizeFile(filepath, options);
}
