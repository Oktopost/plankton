'use strict';


var is = require('./is');


/**
 * @param {*} subject
 * @return {function}
 */
var func = function(subject) {
	if (is.function(subject)) {
		return subject;
	}
	
	return function() { return subject };
};

/**
 * @param {Function} callback
 * @returns {Function}
 */
func.async = function(callback) {
	return function() {
		return Promise.resolve(arguments).then(function (args) {
			return func(callback).apply(null, args);
		});
	};
};


module.exports = func;