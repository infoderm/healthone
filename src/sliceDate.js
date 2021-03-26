import getYear from "date-fns/getYear/index.js";

export default function sliceDate(datestring) {
	const day = datestring.slice(0, 2);
	const month = datestring.slice(2, 4);
	let year = datestring.slice(4, 8);
	if (year.length === 2) {
		const yearNumber = Number.parseInt(year, 10);
		const now = new Date();
		const thisYear = getYear(now);
		const cutOff = thisYear % 100;
		// The logic is that dates can only be in the past with
		// those documents
		// stops working 01 Jan 2100
		// hopefully I'll be dead by then
		year = yearNumber <= cutOff ? `20${year}` : `19${year}`;
	}

	return {year, month, day};
}
