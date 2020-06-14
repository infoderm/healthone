import mergeWith from 'lodash.mergewith';

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
			L5: value
		};
	}

	return copy;
}

export default function expandAndMergeOptions(...options) {
	return mergeWith({}, ...options.map((x) => expandOptions(x)));
}
