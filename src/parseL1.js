import validateLineLength from './validateLineLength';

export default function parseL1(parts) {
	validateLineLength(parts, 'L1', 8);

	const [
		descriptor,
		reference,
		code,
		name,
		normal,
		unit,
		flag,
		measure
	] = parts;

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
				measure
			}
		]
	};
}
