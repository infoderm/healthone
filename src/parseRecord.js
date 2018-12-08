import parseA1 from './parseA1';
import parseA2 from './parseA2';
import parseA3 from './parseA3';
import parseA4 from './parseA4';
import parseA5 from './parseA5';

import parseL1 from './parseL1';
import parseL5 from './parseL5';

export default function parseRecord(parts) {
	const descriptor = parts[0];

	switch (descriptor) {
		case 'A1':
			return parseA1(parts);
		case 'A2':
			return parseA2(parts);
		case 'A3':
			return parseA3(parts);
		case 'A4':
			return parseA4(parts);
		case 'A5':
			return parseA5(parts);
		case 'L1':
			return parseL1(parts);
		case 'L2':
		case 'L3':
		case 'L5':
			return parseL5(parts);
		default:
			throw new Error(`Unknown record descriptor '${descriptor}'`);
	}
}
