export default function stringifyA1(record) {
	const {reference, identifier} = record;

	return ['A1', reference, identifier];
}
