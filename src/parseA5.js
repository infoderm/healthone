import validateLineLength from './validateLineLength.js';

export default function parseA5(parts, options) {
	validateLineLength(parts, 'A5', [7, 8], options.trailing.A5);

	const [descriptor, reference, id, nn, coverage, holder, kg1, kg2] = parts;

	return {
		descriptor,
		reference,
		mutuality: {
			id,
			coverage,
			holder,
			kg1,
			kg2,
		},
		patient: {
			nn,
		},
	};
}
