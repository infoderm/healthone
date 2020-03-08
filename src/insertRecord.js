import mergeWith from 'lodash.mergewith';

function customizer(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
}

export default function insertRecord(report, record) {
	let {kind} = report;

	if (record.reference !== report.reference) {
		throw new Error(
			`Invalid record reference '${record.reference}'. Current reference is '${report.reference}'.`
		);
	}

	switch (record.descriptor) {
		case 'L1':
			if (kind === 'report')
				throw new Error(
					`Invalid record descriptor '${record.descriptor}' for a report document.`
				);
			kind = 'lab';
			break;
		case 'L2':
		case 'L3':
		case 'L5':
			if (kind === 'lab')
				throw new Error(
					`Invalid record descriptor '${record.descriptor}' for a lab document.`
				);
			if (
				report.speciality !== undefined &&
				record.speciality !== report.speciality
			) {
				throw new Error(
					`Invalid record speciality '${record.speciality}'. Current speciality is '${report.speciality}'.`
				);
			}

			kind = 'report';
			break;
		default:
			break; // Do nothing
	}

	return {
		...mergeWith({}, report, record, customizer),
		kind
	};
}
