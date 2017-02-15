'use strict';


var is = require('./is');


/**
 * @param {*} subject
 * @return {Array}
 */
var array = function(subject) {
	if (is.undefined(subject)) {
		return [];
	}
	
	return (is.array(subject) ? subject : [subject]);
};

/**
 * @param {Array} subject
 * @param {function(*)} callback
 */
array.forEach = function(subject, callback) {
	array.forEach.key(subject, function(key) {
		return callback(subject[key]);
	});
};

/**
 * @param {Array} subject
 * @param {function(*)} callback
 */
array.forEach.value = array.forEach;

/**
 * @param {Array} subject
 * @param {function(Number)} callback
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
 * @param {Array} subject
 * @param {function(Number *)} callback
 */
array.forEach.pair = function(subject, callback) {
	array.forEach.key(subject, function(key) {
		return callback(key, subject[key]);
	});
};

/**
 * @param {Array} subject
 * @param {function(Array)} callback
 */
array.forEach.item = function(subject, callback) {
	array.forEach.pair(subject, function(key, value) {
		var obj = {};
		obj[key] = value;
		return callback(obj);
	});
};


/**
 * @param {Array} subject
 * @return {*}
 */
array.last = function (subject) {
	if (subject.length === 0) {
		return undefined;
	}
	
	return subject[subject.length - 1];
};

/**
 * @param {Array} subject
 * @return {Number|undefined}
 */
array.last.key = function (subject) {
	if (subject.length === 0) {
		return undefined;
	}
	
	return subject.length - 1;
};

/**
 * @param {Array} subject
 * @return {*}
 */
array.last.value = array.last;


/**
 * @param {Array} subject
 * @return {*}
 */
array.first = function (subject) {
	var first = undefined;
	
	array.forEach.value(subject, function(value) {
		first = value;
		return false;
	});
	
	return first;
};

/**
 * @param {Array} subject
 * @return {Number|undefined}
 */
array.first.key = function (subject) {
	var first = undefined;
	
	array.forEach.key(subject, function(value) {
		first = value;
		return false;
	});
	
	return first;
};

/**
 * @param {Array} subject
 * @return {*}
 */
array.first.value = array.first;


/**
 * @param {Array} subject
 * @returns {Number}
 */
array.count = function (subject) {
	var count = 0;
	array.forEach(subject, function() { count++; });
	return count;
};

/**
 * @param {Array} subject
 * @returns {Number}
 */
array.isNormalized = function (subject) {
	return subject.length === 0 || array.last.key(subject) === (array.count(subject) - 1);
};

/**
 * @param {Array} subject
 * @returns {Number}
 */
array.normalize = function (subject) {
	var arr = [];
	
	array.forEach(subject, function(value) {
		arr.push(value);
	});
	
	return arr;
};


module.exports = array;