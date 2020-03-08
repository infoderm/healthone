import getYear from 'date-fns/getYear';

export default function sliceDate(datestring) {
	const day = datestring.slice(0, 2);
	const month = datestring.slice(2, 4);
	let year = datestring.slice(4, 8);
	if (year.length === 2) {
		const yearNumber = parseInt(year, 10);
		const now = new Date();
		const thisYear = getYear(now);
		const cutOff = thisYear % 100;
		// The logic is that dates can only be in the past with
		// those documents
		// stops working 01 Jan 2100
		// hopefully I'll be dead by then
		if (yearNumber <= cutOff) {
			year = `20${year}`;
		} else {
			year = `19${year}`;
		}
	}

	return {year, month, day};
}
