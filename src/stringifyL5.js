export default function* stringifyL5(record, options) {
	const {reference, speciality, text} = record;

	for (const line of text) {
		const parts = ['L5', reference, speciality, '', '', '', '', line];

		if (options.trailing.L5) parts.push('');

		yield parts;
	}
}
