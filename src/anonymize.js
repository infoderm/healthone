import faker from 'faker';
import dateformat from "date-fns/format/index.js";

const AGE_MAX = 93;
const SEX_ALLOWED = ['male', 'female'];

function fakenn(birthdate, sex) {
	const yymmdd = Number.parseInt(dateformat(birthdate, 'yyMMdd'), 10);
	const xxx =
		faker.random.number({min: 0, max: 499}) * 2 + (sex === 'male' ? 1 : 0);
	const yymmddxxx = yymmdd * 1000 + xxx;
	const _cd = yymmddxxx % 97;
	const cd = _cd === 0 ? 97 : _cd;
	const yymmddxxxcd = yymmddxxx * 100 + cd;
	const nn = String(yymmddxxxcd).padStart(11, '0');
	return nn;
}

export default function anonymize(document) {
	document.identifier = faker.company.companyName();
	document.reference = String(
		faker.random.number({min: 10000000, max: 99999999}),
	);
	document.requestor = faker.name.lastName();

	document.patient.lastname = faker.name.lastName();
	document.patient.firstname = faker.name.firstName();
	document.patient.sex = faker.random.arrayElement(SEX_ALLOWED);
	document.patient.birthdate = faker.date.past(AGE_MAX);
	document.patient.municipality = faker.address.city();
	document.patient.streetandnumber = faker.address.streetAddress();
	document.patient.zip = faker.address.zipCode();
	document.patient.nn = fakenn(
		document.patient.birthdate,
		document.patient.sex,
	);

	if (document.mutuality) {
		document.mutuality.id = String(faker.random.number({min: 0, max: 999}));
		document.mutuality.coverage = '';
		document.mutuality.holder = '';
		document.mutuality.kg1 = String(faker.random.number({min: 0, max: 999}));
		document.mutuality.kg2 = String(faker.random.number({min: 0, max: 999}));
	}
}
