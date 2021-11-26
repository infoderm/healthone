// eslint-disable-next-line import/no-unassigned-import
import 'regenerator-runtime/runtime.js';

import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';

import {parse} from '../../src/index.js';

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
