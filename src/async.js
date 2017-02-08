'use strict';


/**
 * @param {Function} callback
 * @returns {Promise}
 */
var async =  function(callback) {
	return Promise.resolve(arguments).then(function(arg) {
		return callback.apply(null, arg);
	});
};

/**
 * @param {Function} callback
 * @returns {Promise}
 */
async.do = async;


module.exports = async;