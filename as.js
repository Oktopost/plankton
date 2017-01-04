'use strict';


var is = require('./is.js');


var as = {
	array: function(subject) {
		if (is.array(subject)) {
			return subject;
		}
		
		return [subject];
	},
	
	callback: function(subject) {
		return function() { return subject; };
	},
	
	async: function(callback) {
		return function() {
			return Promise.resolve(arguments).then(function (args) {
				return callback.apply(null, args);
			});
		};
	}
};


module.exports = as;