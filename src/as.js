'use strict';


var is = require('./is');
var func = require('./func');
var array = require('./array');


var as = {};


/**
 * @param {*} subject
 * @returns {boolean}
 */
as.bool = function(subject) {
	return is.true(subject);
};
	
/**
 * @param subject
 * @returns {*}
 */
as.array = array;

/**
 * @param subject
 * @return {*}
 */
as.func = func;

/**
 * @param {Function} callback
 * @returns {Function}
 */
as.async = func.async;


module.exports = as;