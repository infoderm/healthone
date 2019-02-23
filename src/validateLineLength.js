export default function validateLineLength(parts, kind, length) {
	if (parts.length !== length + 1) {
		throw new Error(
			`parse${kind}: wrong number of parts, got ${
				parts.length
			}, expected ${length + 1}.`
		);
	}

	if (parts[length] !== '') {
		throw new Error(
			`parse${kind}: wrong last part, got ${parts[length]}, expected ''.`
		);
	}
}
