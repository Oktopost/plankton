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
		callback(subject[key]);
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
	obj.keys(subject).forEach(function(key) {
		callback(key);
	});
};

/**
 * @param {Object} subject
 * @param {function(*)} callback
 */
forEach.item = function(subject, callback) {
	forEach.key(subject, function(key) {
		var item = {};
		item[key] = subject[key];
		callback(item);
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