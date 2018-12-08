import merge from 'lodash.merge';

export default function insertLine(report, line) {
	return merge({}, report, {source: [line]});
}
