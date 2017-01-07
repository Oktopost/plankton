'use strict';


var is = require('./is');


var as = {

	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	bool: function(subject) {
		return is.true(subject);
	},
	
	/**
	 * @param subject
	 * @returns {*}
	 */
	array: function(subject) {
		if (is.undefined(subject)) {
			return [];
		}
		
		return (is.array(subject) ? subject : [subject]);
	},

	/**
	 * @param subject
	 * @return {*}
	 */
	func: function(subject) {
		if (is.function(subject)) {
			return subject;
		}
		
		return function() { return subject };
	},
	
	/**
	 * @param {Function} callback
	 * @returns {Function}
	 */
	async: function(callback) {
		return function() {
			return Promise.resolve(arguments).then(function (args) {
				return as.func(callback).apply(null, args);
			});
		};
	}
};


module.exports = as;