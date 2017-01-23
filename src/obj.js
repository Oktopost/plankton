'use strict';


const is = require('./is');


var obj = {};


/**
 * @param subject
 * @returns {*|undefined}
 */
obj.any = function(subject) {
	var key = obj.any.key(subject);
	return (is.defined(key) ? subject[key] : undefined);
};

/**
 * @param {Object} subject
 * @return {*|undefined}
 */
obj.any.value = obj.any;

/**
 * @param {Object} subject
 * @return {*|undefined}
 */
obj.any.key = function(subject) {
	var keys = obj.keys(subject);
	return keys.length > 0 ? keys[0] : undefined;
};

/**
 * @param {Object} subject
 * @return {*|undefined}
 */
obj.any.item = function(subject) {
	var key = obj.any.key(subject);
	var res = undefined;
	
	if (is.defined(key)) {
		res = {};
		res[key] = subject[key];
	}
	
	return res;
};


/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
obj.forEach = function(subject, callback) {
	obj.forEach.key(subject, function(key) {
		return callback(subject[key]);
	});
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
obj.forEach.value = obj.forEach;

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
obj.forEach.key = function(subject, callback) {
	for (var key in subject) {
		if (!subject.hasOwnProperty(key)) {
			continue;
		}
		
		if (callback(key) === false) {
			break;
		}
	}
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
obj.forEach.pair = function(subject, callback) {
	obj.forEach.key(subject, function(key) {
		return callback(key, subject[key]);
	});
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
obj.forEach.item = function(subject, callback) {
	obj.forEach.pair(subject, function(key, value) {
		var res = {};
		res[key] = value;
		return callback(res);
	});
};

	
/**
 * @param {Object} subject
 * @returns {Array}
 */
obj.values = function(subject) {
	return obj.keys(subject).reduce(function (result, key) {
		result.push(subject[key]);
		return result;
	}, [])
};

	
/**
 * @param {Object} subject
 * @returns {Array}
 */
obj.keys = function(subject) {
	return Object.keys(subject);
};


/**
 * @param {Object} subject
 * @returns {Array}
 */
obj.count = function(subject) {
	return obj.keys(subject).length;
};


module.exports = obj;