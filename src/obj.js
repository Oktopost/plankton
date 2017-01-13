'use strict';


const is = require('./is');


/**
 * @param subject
 * @returns {*|undefined}
 */
var any = function(subject) {
	var key = any.key(subject);
	return (is.defined(key) ? subject[key] : undefined);
};

/**
 * @param {Object} subject
 * @return {*|undefined}
 */
any.value = any;

/**
 * @param {Object} subject
 * @return {*|undefined}
 */
any.key = function(subject) {
	var keys = obj.keys(subject);
	return keys.length > 0 ? keys[0] : undefined;
};

/**
 * @param {Object} subject
 * @return {*|undefined}
 */
any.item = function(subject) {
	var key = any.key(subject);
	var obj = undefined;
	
	if (is.defined(key)) {
		obj = {};
		obj[key] = subject[key];
	}
	
	return obj;
};


/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
var forEach = function(subject, callback) {
	forEach.key(subject, function(key) {
		return callback(subject[key]);
	});
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
forEach.value = forEach;

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
forEach.key = function(subject, callback) {
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
forEach.item = function(subject, callback) {
	forEach.key(subject, function(key) {
		return callback(key, subject[key]);
	});
};


var obj = {
	any: any,
	forEach: forEach,
	
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	values: function(subject) {
		return obj.keys(subject).reduce(function (result, key) {
			result.push(subject[key]);
			return result;
		}, [])
	},
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	keys: function(subject) {
		return Object.keys(subject);
	}
};


module.exports = obj;