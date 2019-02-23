export default function sliceTime(timestring) {
	const hour = timestring.slice(0, 2);
	const minute = timestring.slice(2, 4);

	return {hour, minute};
}
