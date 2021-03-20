export default function validateRequiredField(parts, name, position) {
	if (parts[position - 1] === '') {
		throw new Error(
			`Request ${name} is a required field on position ${position}`,
		);
	}
}
