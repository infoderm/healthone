import validateLineLength from './validateLineLength.js';

export default function parseL1(parts, options) {
	validateLineLength(parts, 'L1', [7, 8], options.trailing.L1);

	const [descriptor, reference, code, name, normal, unit, flag, measure] =
		parts;

	return {
		descriptor,
		reference,
		results: [
			{
				code,
				name,
				normal,
				unit,
				flag,
				measure,
			},
		],
	};
}
