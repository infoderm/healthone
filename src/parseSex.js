export default function parseSex(letter) {
	switch (letter) {
		case 'F':
		case 'V': {
			return 'female';
		}

		case 'M': {
			return 'male';
		}

		default: {
			return 'other';
		}
	}
}
