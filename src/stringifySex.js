export default function stringifySex(sex, options) {
	switch (sex) {
		case 'female': {
			return options.lang === 'nl' ? 'V' : 'F';
		}

		case 'male': {
			return 'M';
		}

		default: {
			return '';
		}
	}
}
