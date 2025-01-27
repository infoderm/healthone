import assert from 'node:assert';

import mergeWith from 'lodash.mergewith/index.js';

function customizer(objectValue, srcValue) {
	if (Array.isArray(objectValue)) {
		return objectValue.concat(srcValue);
	}
}

export default function insertRecord(report, {descriptor, ...record}) {
	const {kind} = report;

	if (record.reference !== report.reference) {
		throw new Error(
			`Invalid record reference '${record.reference}'. Current reference is '${report.reference}'.`,
		);
	}

	switch (descriptor) {
		case 'L1': {
			if (kind === 'report')
				throw new Error(
					`Invalid record descriptor '${descriptor}' for a report document.`,
				);
			return {
				...mergeWith({}, report, record, customizer),
				kind: 'lab',
			};
		}

		case 'L2':
		case 'L3':
		case 'L5': {
			if (kind === 'lab')
				throw new Error(
					`Invalid record descriptor '${descriptor}' for a lab document.`,
				);
			if (
				report.speciality !== undefined &&
				record.speciality !== report.speciality
			) {
				throw new Error(
					`Invalid record speciality '${record.speciality}'. Current speciality is '${report.speciality}'.`,
				);
			}

			const {speciality, text, ...rest} = record;

			if (report.sections !== undefined) {
				const {sections, ...metadata} = report;
				assert(sections.length > 0);

				const head = sections.slice(0, -1);
				const last = sections.at(-1);

				if (speciality === last.speciality) {
					return {
						...mergeWith(
							{},
							metadata,
							rest,
							{
								sections: [...head, mergeWith({}, last, {text}, customizer)],
							},
							customizer,
						),
						kind: 'report',
					};
				}
			}

			return {
				...mergeWith(
					{},
					report,
					rest,
					{
						sections: [
							{
								speciality,
								text,
							},
						],
					},
					customizer,
				),
				kind: 'report',
			};
		}

		default: {
			return mergeWith({}, report, record, customizer);
		}
	}
}
