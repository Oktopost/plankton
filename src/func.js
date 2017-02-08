'use strict';


var is = require('./is');


/**
 * @param {*} subject
 * @return {function}
 */
var func = function(subject) {
	if (is.function(subject)) {
		return subject;
	}
	
	return function() { return subject };
};

/**
 * @param {Function} callback
 * @returns {Function}
 */
func.async = function(callback) {
	return function() {
		return Promise.resolve(arguments).then(function (args) {
			return func(callback).apply(null, args);
		});
	};
};

/**
 * @param {Function} callback
 * @param {function(*)|undefined} errorHandler
 * @return {Function}
 */
func.safe = function(callback, errorHandler) {
	return function() {
		try {
			callback.apply(null, arguments);
		} catch (error) {
			if (is.function(errorHandler)) {
				errorHandler(error);
			}
		}
	};
};

/**
 * @param {Function} callback
 * @return {Function}
 */
func.silent = function(callback) {
	return func.safe(callback);
};

/**
 * @param {Function} callback
 * @return {Function}
 */
func.cached = function(callback) {
	var isCalled = false;
	var result;
	
	return function() {
		if (isCalled) {
			return result;
		}
		
		isCalled = true;
		result = callback.apply(null, arguments);
		return result;
	};
};

/**
 * @param {Function} callback
 * @param {Number} ms
 * @return {Function}
 */
func.postponed = function(callback, ms) {
	return function() {
		var args = arguments;
		
		return new Promise(function(resolve) {
			setTimeout(function() {
				resolve(callback.apply(null, args));
			}, ms);
		});
	};
};


module.exports = func;