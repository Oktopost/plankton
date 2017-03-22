'use strict';


var func = require('./func');


/**
 * @param {Function} callback
 * @returns {Promise}
 * @function
 */
var async = func.async;


/**
 * @param {Function} callback
 * @return {Promise}
 */
async.do = function(callback) {
	return (async(callback))();
};


module.exports = async;