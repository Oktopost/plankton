'use strict';


var is = require('./is.js');


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
		return (is.array(subject) ? subject : [subject]);
	},


	/**
	 * @param {Function} callback
	 * @returns {Function}
	 */
	async: function(callback) {
		return function() {
			return Promise.resolve(arguments).then(function (args) {
				return callback.apply(null, args);
			});
		};
	}
};


module.exports = as;