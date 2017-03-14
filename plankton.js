window.plankton = {};
window.plankton.mixin = function(mixin) {
	for (var key in mixin) {
		window.plankton[key] = mixin[key];
	}
};
(function() {
	var module = {};
	
	(function(module, plankton) {
		'use strict';


var ARRAY_INDEX_REGEX = /^0$|^[1-9]\d*$/;
var ARRAY_INDEX_MAX_VALUE = 4294967294;


var is = function(subject) {
	return is.true(subject);
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
is.array = function(subject) {
	return toString.call(subject) === '[object Array]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.array.empty = function(subject) {
	return is.array(subject) && subject.length === 0;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.array.notEmpty = function(subject) {
	return is.array(subject) && subject.length > 0;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
is.object = function(subject) {
	return toString.call(subject) === '[object Object]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.object.empty = function(subject) {
	return is.object(subject) && Object.keys(subject).length === 0;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.object.notEmpty = function(subject) {
	return is.object(subject) && Object.keys(subject).length > 0;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
is.string = function(subject) {
	return toString.call(subject) === '[object String]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.string.empty = function(subject) {
	return is.string(subject) && subject.length === 0;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.string.notEmpty = function(subject) {
	return is.string(subject) && subject.length > 0;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
is.numeric = function(subject) {
	return is.number(subject) && !is.infinite(subject) && !isNaN(subject);
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.numeric.int = function(subject) {
	return is.numeric(subject) && (subject % 1 === 0);
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.numeric.float = function(subject) {
	return is.numeric(subject) && (subject % 1 !== 0);
};

/**
 * @param {*} subject
 * @return {boolean}
 */
is.numeric.odd = function(subject) {
	return is.numeric.int(subject) && (subject % 2 !== 0);
};

/**
 * @param {*} subject
 * @return {boolean}
 */
is.numeric.even = function(subject) {
	return is.numeric.int(subject) && (subject % 2 === 0);
};


/**
 * @param {*} subject
 * @return {boolean}
 */
is.collection = function(subject) {
	return is.object(subject) || is.array(subject) || is.string(subject);
};

/**
 * @param {*} subject
 * @return {boolean}
 */
is.collection.empty = function(subject) {
	if (is.array(subject)) {
		return is.array.empty(subject);
	} else if (is.object(subject)) {
		return is.object.empty(subject);
	} else if (is.string(subject)) {
		return is.string.empty(subject)
	}
	
	return false;
};

/**
 * @param {*} subject
 * @return {boolean}
 */
is.collection.notEmpty = function(subject) {
	if (is.array(subject)) {
		return !is.array.empty(subject);
	} else if (is.object(subject)) {
		return !is.object.empty(subject);
	} else if (is.string(subject)) {
		return !is.string.empty(subject)
	}
	
	return false;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
is.number = function(subject) {
	return toString.call(subject) === '[object Number]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.bool = function(subject) {
	return toString.call(subject) === '[object Boolean]';
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
is.defined = function(subject) {
	return typeof subject !== 'undefined';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.undefined = function(subject) {
	return typeof subject === 'undefined';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.function = function(subject) {
	return toString.call(subject) === '[object Function]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.NaN = function(subject) {
	return isNaN(subject) && toString.call(subject) === '[object Number]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.infinite = function(subject) {
	return Number.POSITIVE_INFINITY === subject || Number.NEGATIVE_INFINITY === subject;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.null = function(subject) {
	return subject === null;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.jsObject = function(subject) {
	return subject instanceof Object;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.jsPrimitive = function(subject) {
	return !is.jsObject(subject);
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.empty = function(subject) {
	if (is.collection(subject)) {
		return is.collection.empty(subject);
	}
	
	throw 'Subject is not Array, Object or String';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.json = function(subject) {
	if (!is.string(subject)) {
		return false;
	}
	
	try {
		JSON.parse(subject);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.false = function(subject) {
	return subject === false || 
		subject === 0 || 
		subject === null || 
		is.undefined(subject) || 
		is.collection.empty(subject) || 
		is.NaN(subject);
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
is.true = function(subject) {
	return !is.false(subject);
};

/**
 * @param {*} subject
 * @retrns {boolean}
 */
is.index = function(subject) {
	return ARRAY_INDEX_REGEX.test(subject) && subject <= ARRAY_INDEX_MAX_VALUE;
};


module.exports = {is: is};
	})(module, window.plankton);
	
	window.plankton.mixin(module.exports);
})();
(function() {
	var module = {};
	
	(function(module, plankton) {
		'use strict';


var is = plankton.is;


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


module.exports = {array: array};
	})(module, window.plankton);
	
	window.plankton.mixin(module.exports);
})();
(function() {
	var module = {};
	
	(function(module, plankton) {
		'use strict';


const is = plankton.is;


var obj = {};


/**
 * @param {string|number} key
 * @param {*} value
 * @returns {Object}
 */
obj.combine = function(key, value) {
	var res = {};
	res[key] = value;
	return res;
};


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
		res = obj.combine(key, subject[key]);
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
		return callback(obj.combine(key, value));
	});
};


/**
 * @param {Object} subject
 * @param {function(*): bool|null|number} callback
 * @returns {Object}
 */
obj.filter = function(subject, callback) {
	return obj.filter.pair(subject, function(key, value) {
		return callback(value);
	})
};

/**
 * @param {Object} subject
 * @param {function(*): bool|null|number} callback
 * @returns {Object}
 */
obj.filter.value = obj.filter;

/**
 * @param {Object} subject
 * @param {function(*): bool|null|number} callback
 * @returns {Object}
 */
obj.filter.key = function(subject, callback) {
	return obj.filter.pair(subject, function(key) {
		return callback(key);
	})
};

/**
 * @param {Object} subject
 * @param {function(*): bool|null|number} callback
 * @returns {Object}
 */
obj.filter.pair = function(subject, callback) {
	var filtered = {};
	
	obj.forEach.pair(subject, function(key, value) {
		var res = callback(key, value);
		
		if (is.null(res)) {
			return false;
		} else {
			filtered[key] = value;
			
			if (res === -1) {
				return false;
			}
		}
	});
	
	return filtered;
};

/**
 * @param {Object} subject
 * @param {function(*): bool|null|number} callback
 * @returns {Object}
 */
obj.filter.item = function(subject, callback) {
	return obj.filter.pair(subject, function(key, value) {
		return callback(obj.combine(key, value));
	})
};


/**
 * @param {Object} subject
 * @returns {Array}
 */
obj.values = function(subject) {
	return obj.keys(subject).reduce(function (result, key) {
		result.push(subject[key]);
		return result;
	}, []);
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


module.exports = {obj: obj};
	})(module, window.plankton);
	
	window.plankton.mixin(module.exports);
})();
(function() {
	var module = {};
	
	(function(module, plankton) {
		'use strict';


var is = plankton.is;


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


/**
 * @param {Function} callback
 * @param {Number} ms
 * @param {Number} [realMs=1000] realMs
 * @return {Function}
 */
func.interval = function (callback, ms, realMs) {
	if (!is.numeric(realMs) || realMs <= 0) {
		realMs = 1000;
	}

	var isRunning = false;
	var now;
	var nextInvokeDate;
	var interval;

	var startInterval = function () {
		interval = setInterval(function () {
			now = +new Date();
			isRunning = true;

			if (now >= nextInvokeDate) {
				callback(nextInvokeDate);
				nextInvokeDate += ms;
			}
		}, realMs);
	};

	var result = function () {
		this.start = function () {
			if (isRunning) {
				return false;
			}

			nextInvokeDate = +new Date() + ms;
			startInterval();
		};
		
		this.stop = function () {
			clearInterval(interval);
			isRunning = false;
		};
		
		this.isRunning = function () {
			return isRunning;
		}	
	};
	
	return new result().start();

};

module.exports = {func: func};
	})(module, window.plankton);
	
	window.plankton.mixin(module.exports);
})();
(function() {
	var module = {};
	
	(function(module, plankton) {
		'use strict';


var is = plankton.is;
var func = plankton.func;
var array = plankton.array;


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


module.exports = {as: as};
	})(module, window.plankton);
	
	window.plankton.mixin(module.exports);
})();