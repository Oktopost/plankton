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


module.exports = is;