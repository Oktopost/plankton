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
array.forEach.value = array.forEach;

/**
 * @param {Object} subject
 * @param {function(number)} callback
 */
array.forEach.key = function(subject, callback) {
	for (var key in subject) {
		if (!is.index(key) || !subject.hasOwnProperty(key)) {
			continue;
		}
		
		if (callback(parseInt(key)) === false) {
			break;
		}
	}
};

/**
 * @param {Object} subject
 * @param {function(number *)} callback
 */
array.forEach.pair = function(subject, callback) {
	array.forEach.key(subject, function(key) {
		return callback(key, subject[key]);
	});
};

/**
 * @param {Object} subject
 * @param {function(Object)} callback
 */
array.forEach.item = function(subject, callback) {
	array.forEach.pair(subject, function(key, value) {
		var obj = {};
		obj[key] = value;
		return callback(obj);
	});
};


module.exports = array;