'use strict';


var is = require('./is');


var array = function(subject) {
	if (is.undefined(subject)) {
		return [];
	}
	
	return (is.array(subject) ? subject : [subject]);
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
array.forEach = function(subject, callback) {
	array.forEach.key(subject, function(key) {
		return callback(subject[key]);
	});
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
array.forEach.value = forEach;

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
array.forEach.key = function(subject, callback) {
	for (var key in subject) {
		if (!is.index(key) || !subject.hasOwnProperty(key)) {
			continue;
		}
		
		if (callback(key) === false) {
			break;
		}
	}
};

/**
 * @param {Object} subject
 * @param {function(item Object)} callback
 */
array.forEach.item = function(subject, callback) {
	array.forEach.key(subject, function(key) {
		return callback(key, subject[key]);
	});
};


module.exports = array;