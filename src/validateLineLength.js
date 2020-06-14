export default function validateLineLength(
	parts,
	kind,
	validLengths,
	trailingSlash
) {
	if (typeof validLengths === 'number') validLengths = [validLengths];
	let validLengthsWithTrailingSlash =
		trailingSlash === false ? [] : validLengths.map((x) => x + 1);
	validLengths = trailingSlash === true ? [] : validLengths;
	validLengths = new Set(validLengths);
	validLengthsWithTrailingSlash = new Set(validLengthsWithTrailingSlash);

	const isValidLength = validLengths.has(parts.length);
	const isValidLengthWithTrailingSlash = validLengthsWithTrailingSlash.has(
		parts.length
	);

	if (!isValidLength && !isValidLengthWithTrailingSlash) {
		const expectedLengths = [
			...new Set([...validLengths, ...validLengthsWithTrailingSlash])
		];
		expectedLengths.sort();
		const expected = `any of ${JSON.stringify(expectedLengths)}`;
		throw new Error(
			`parse${kind}: wrong number of parts, got ${parts.length}, expected ${expected}.`
		);
	}

	if (
		trailingSlash === true ||
		(isValidLengthWithTrailingSlash && !isValidLength)
	) {
		// Last part MUST be empty
		const last = parts.length - 1;
		if (parts[last].trimStart() !== '') {
			throw new Error(
				`parse${kind}: wrong last part, got ${parts[last]}, expected ''.`
			);
		}
	}
}
