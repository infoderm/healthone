export default function stringifyA3(record) {
	const {
		reference,
		patient: {streetandnumber, zip, municipality}
	} = record;

	return ['A3', reference, streetandnumber, zip, municipality];
}
