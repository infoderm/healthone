export default function stringifyA5(record, options) {
	const {
		reference,
		mutuality: {id, coverage, holder, kg1, kg2},
		patient: {nn}
	} = record;

	const parts = ['A5', reference, id, nn, coverage, holder, kg1, kg2];

	if (options.trailing.A5) parts.push('');

	return parts;
}
