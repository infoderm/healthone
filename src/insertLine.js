import mergeWith from "lodash.mergewith/index.js";

function customizer(objectValue, srcValue) {
	if (Array.isArray(objectValue)) {
		return objectValue.concat(srcValue);
	}
}

export default function insertLine(report, line) {
	return mergeWith({}, report, {source: [line]}, customizer);
}
