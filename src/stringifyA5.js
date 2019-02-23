export default function stringifyA5(record) {
	const {
		reference,
		mutuality: {id, coverage, holder, kg1, kg2},
		patient: {nn}
	} = record;

	return ['A5', reference, id, nn, coverage, holder, kg1, kg2];
}
