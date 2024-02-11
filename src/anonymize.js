import {faker} from '@faker-js/faker';
import {format as dateformat} from 'date-fns';

const AGE_MAX = 93;
const SEX_ALLOWED = ['male', 'female'];

function fakenn(birthdate, sex) {
	const yymmdd = Number.parseInt(dateformat(birthdate, 'yyMMdd'), 10);
	const xxx =
		faker.number.int({min: 0, max: 499}) * 2 + (sex === 'male' ? 1 : 0);
	const yymmddxxx = yymmdd * 1000 + xxx;
	const _cd = yymmddxxx % 97;
	const cd = _cd === 0 ? 97 : _cd;
	const yymmddxxxcd = yymmddxxx * 100 + cd;
	const nn = String(yymmddxxxcd).padStart(11, '0');
	return nn;
}

export default function anonymize(document) {
	document.identifier = faker.company.name();
	document.reference = String(
		faker.number.int({min: 10_000_000, max: 99_999_999}),
	);
	document.requestor = faker.person.lastName();

	document.patient.lastname = faker.person.lastName();
	document.patient.firstname = faker.person.firstName();
	document.patient.sex = faker.helpers.arrayElement(SEX_ALLOWED);
	document.patient.birthdate = faker.date.past({years: AGE_MAX});
	document.patient.municipality = faker.location.city();
	document.patient.streetandnumber = faker.location.streetAddress();
	document.patient.zip = faker.location.zipCode();
	document.patient.nn = fakenn(
		document.patient.birthdate,
		document.patient.sex,
	);

	if (document.mutuality) {
		document.mutuality.id = String(faker.number.int({min: 0, max: 999}));
		document.mutuality.coverage = '';
		document.mutuality.holder = '';
		document.mutuality.kg1 = String(faker.number.int({min: 0, max: 999}));
		document.mutuality.kg2 = String(faker.number.int({min: 0, max: 999}));
	}
}
