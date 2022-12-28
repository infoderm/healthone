import stringifyA1 from './stringifyA1.js';
import stringifyA2 from './stringifyA2.js';
import stringifyA3 from './stringifyA3.js';
import stringifyA4 from './stringifyA4.js';
import stringifyA5 from './stringifyA5.js';

import stringifyL1 from './stringifyL1.js';
import stringifyL5 from './stringifyL5.js';

export default function* stringifyRecord(record, options) {
	yield stringifyA1(record, options);
	yield stringifyA2(record, options);
	yield stringifyA3(record, options);
	yield stringifyA4(record, options);
	if (record.mutuality) yield stringifyA5(record, options);

	switch (record.kind) {
		case 'lab': {
			yield* stringifyL1(record, options);
			break;
		}

		case 'report': {
			yield* stringifyL5(record, options);
			break;
		}

		default: {
			throw new Error(`Unknown record kind '${record.kind}'`);
		}
	}
}
