require('@babel/polyfill');

const fs = require('fs');

const parse = require('../../lib/parse').default;
const stringify = require('../../lib/stringify').default;
const anonymize = require('../../lib/anonymize').default;

function anonymizeFile(filename, options) {
	const source = fs.readFileSync(`hlt/${filename}`).toString();
	const documents = parse(source);
	for (const document of documents) {
		anonymize(document);
	}
	const modified = stringify(documents, options);
	fs.writeFileSync(`hlt/${filename}`, modified);
}

const testFiles = process.argv.slice(2);
for (const filename of testFiles) {
	const options = {
		nnInA2: filename.match(/nnInA2/),
		ntA5: filename.match(/ntA5/),
		lang: filename.match(/nl/) ? 'nl' : 'fr'
	};

	if (filename.match(/yy/)) {
		options.dateFormat = 'ddMMyy';
	}

	if (filename.match(/end/)) {
		options.end = 'END';
	}

	if (filename.match(/cr/)) {
		options.newline = '\r\n';
	}

	anonymizeFile(filename, options);
}
