require('@babel/polyfill');

const fs = require('fs');
const path = require('path');

const {parse} = require('../../src/index.js');

function init(filepath) {
	const filename = path.basename(filepath);
	const source = fs.readFileSync(filepath).toString();
	const documents = parse(source);
	const blob = JSON.stringify(documents, null, 2);
	fs.writeFileSync(`json/${filename}`, blob);
}

const testFiles = process.argv.slice(2);
for (const filepath of testFiles) {
	init(filepath);
}
