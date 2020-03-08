export default function* stringifyL1(record) {
	const {reference, results} = record;

	for (const result of results) {
		const {code, name, normal, unit, flag, measure} = result;

		yield ['L1', reference, code, name, normal, unit, flag, measure, ''];
	}
}
