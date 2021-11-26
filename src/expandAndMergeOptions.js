import mergeWith from 'lodash.mergewith/index.js';

function expandOptions(options) {
	const copy = Object.assign({}, options);
	if (
		copy.trailing === undefined ||
		copy.trailing.constructor.prototype !== Object.prototype
	) {
		const value = copy.trailing;
		copy.trailing = {
			A1: value,
			A2: value,
			A3: value,
			A4: value,
			A5: value,
			L1: value,
			L5: value,
		};
	}

	if (
		copy.required === undefined ||
		copy.required.constructor.prototype !== Object.prototype
	) {
		const value = copy.required;
		copy.required = {
			reference: value,
			lastname: value,
			firstname: value,
			sex: value,
			birthdate: value,
			date: value,
		};
	}

	return copy;
}

export default function expandAndMergeOptions(...options) {
	return mergeWith({}, ...options.map((x) => expandOptions(x)));
}
