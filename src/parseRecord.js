import parseA1 from './parseA1.js';
import parseA2 from './parseA2.js';
import parseA3 from './parseA3.js';
import parseA4 from './parseA4.js';
import parseA5 from './parseA5.js';

import parseL1 from './parseL1.js';
import parseL5 from './parseL5.js';

export default function parseRecord(parts, options) {
	let [descriptor, ...rest] = parts;
	descriptor = parts[0].trim(); // To remove <feff> byte order mark
	parts = [descriptor, ...rest];

	switch (descriptor) {
		case 'A1':
			return parseA1(parts, options);
		case 'A2':
			return parseA2(parts, options);
		case 'A3':
			return parseA3(parts, options);
		case 'A4':
			return parseA4(parts, options);
		case 'A5':
			return parseA5(parts, options);
		case 'L1':
			return parseL1(parts, options);
		case 'L2':
		case 'L3':
		case 'L5':
			return parseL5(parts, options);
		default:
			throw new Error(`Unknown record descriptor '${descriptor}'`);
	}
}
