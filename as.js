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
	
	promise: function(subject) {
		return new Promise(function (resolve) { resolve(subject); });
	}
};


module.exports = as;