export default function* stringifyL5(record) {
	const {reference, speciality, text} = record;

	for (const line of text) {
		yield ['L5', reference, speciality, '', '', '', '', line, ''];
	}
}
