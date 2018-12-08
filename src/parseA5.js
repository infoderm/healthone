import validateLineLength from './validateLineLength';

export default function parseA5(parts) {
	validateLineLength(parts, 'A5', 8);

	const [descriptor, reference, id, nn, coverage, holder, kg1, kg2] = parts;

	return {
		descriptor,
		reference,
		mutuality: {
			id,
			coverage,
			holder,
			kg1,
			kg2
		},
		patient: {
			nn
		}
	};
}
