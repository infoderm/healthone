export default function parseStatus(letter) {
	switch (letter) {
		case 'P': {
			return 'partial';
		}

		case 'C': {
			return 'complete';
		}

		default: {
			return 'unknown';
		}
	}
}
