import mergeWith from 'lodash.mergewith';

function customizer(objValue, srcValue) {
	if (Array.isArray(objValue)) {
		return objValue.concat(srcValue);
	}
}

export default function insertLine(report, line) {
	return mergeWith({}, report, {source: [line]}, customizer);
}
