require('@babel/polyfill');

const fs = require('fs');

const parse = require('../../lib/parse').default;

function init(filename) {
	const source = fs.readFileSync(`hlt/${filename}`).toString();
	const documents = parse(source);
	const blob = JSON.stringify(documents, null, 2);
	fs.writeFileSync(`json/${filename}`, blob);
}

const testFiles = process.argv.slice(2);
for (const filename of testFiles) {
	init(filename);
}
