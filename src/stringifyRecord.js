import stringifyA1 from './stringifyA1';
import stringifyA2 from './stringifyA2';
import stringifyA3 from './stringifyA3';
import stringifyA4 from './stringifyA4';
import stringifyA5 from './stringifyA5';

import stringifyL1 from './stringifyL1';
import stringifyL5 from './stringifyL5';

export default function* stringifyRecord(record, options) {
	yield stringifyA1(record, options);
	yield stringifyA2(record, options);
	yield stringifyA3(record, options);
	yield stringifyA4(record, options);
	if (record.mutuality) yield stringifyA5(record, options);

	switch (record.kind) {
		case 'lab':
			yield* stringifyL1(record, options);
			break;
		case 'report':
			yield* stringifyL5(record, options);
			break;
		default:
			throw new Error(`Unknown record kind '${record.kind}'`);
	}
}
