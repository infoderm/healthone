export default function stringifyStatus(status) {
	switch (status) {
		case 'partial':
			return 'P';
		case 'complete':
			return 'C';
		default:
			return '';
	}
}
