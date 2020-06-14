export default function stringifyA1(record, options) {
	const {reference, identifier} = record;

	const parts = ['A1', reference, identifier];

	if (options.trailing.A1) parts.push('');

	return parts;
}
