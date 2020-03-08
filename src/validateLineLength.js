export default function validateLineLength(parts, kind, validLengths) {
	if (typeof validLengths === 'number') validLengths = [validLengths];
	validLengths = new Set(validLengths.map(x => x + 1));

	if (!validLengths.has(parts.length)) {
		const expected = `any of ${JSON.stringify([...validLengths])}`;
		throw new Error(
			`parse${kind}: wrong number of parts, got ${parts.length}, expected ${expected}.`
		);
	}

	// Last part must be empty
	const last = parts.length - 1;
	if (parts[last] !== '') {
		throw new Error(
			`parse${kind}: wrong last part, got ${parts[last]}, expected ''.`
		);
	}
}
