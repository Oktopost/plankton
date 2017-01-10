'use strict';


var obj = {

	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	values: function(subject) {
		return Object.keys(subject).reduce(function (result, key) {
			result.push(subject[key]);
			return result;
		}, [])
	}
};


module.exports = obj;