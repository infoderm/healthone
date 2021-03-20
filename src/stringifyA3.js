export default function stringifyA3(record, options) {
	const {
		reference,
		patient: {streetandnumber, zip, municipality},
	} = record;

	const parts = ['A3', reference, streetandnumber, zip, municipality];

	if (options.trailing.A3) parts.push('');

	return parts;
}
