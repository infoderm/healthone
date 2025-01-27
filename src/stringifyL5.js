export default function* stringifyL5(record, options) {
	const {reference, sections} = record;

	for (const {speciality, text} of sections) {
		for (const line of text) {
			const parts = ['L5', reference, speciality, '', '', '', '', line];

			if (options.trailing.L5) parts.push('');

			yield parts;
		}
	}
}
