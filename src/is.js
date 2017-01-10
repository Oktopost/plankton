'use strict';


/**
 * @param {*} subject
 * @returns {boolean}
 */
var array = function(subject) {
	return toString.call(subject) === '[object Array]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
array.empty = function(subject) {
	return is.array(subject) && subject.length === 0;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
array.notEmpty = function(subject) {
	return is.array(subject) && subject.length > 0;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
var object = function(subject) {
	return toString.call(subject) === '[object Object]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
object.empty = function(subject) {
	return is.object(subject) && Object.keys(subject).length === 0;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
object.notEmpty = function(subject) {
	return is.object(subject) && Object.keys(subject).length > 0;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
var string = function(subject) {
	return toString.call(subject) === '[object String]';
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
string.empty = function(subject) {
	return is.string(subject) && subject.length === 0;
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
string.notEmpty = function(subject) {
	return is.string(subject) && subject.length > 0;
};


/**
 * @param {*} subject
 * @returns {boolean}
 */
var numeric = function(subject) {
	return is.number(subject) && !is.infinite(subject) && !isNaN(subject);
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
numeric.int = function(subject) {
	return is.numeric(subject) && (subject % 1 === 0);
};

/**
 * @param {*} subject
 * @returns {boolean}
 */
numeric.float = function(subject) {
	return is.numeric(subject) && (subject % 1 !== 0);
};

/**
 * @param {*} subject
 * @return {boolean}
 */
numeric.odd = function(subject) {
	return is.numeric.int(subject) && (subject % 2 !== 0);
};

/**
 * @param {*} subject
 * @return {boolean}
 */
numeric.even = function(subject) {
	return is.numeric.int(subject) && (subject % 2 === 0);
};


/**
 * @param {*} subject
 * @return {boolean}
 */
var collection = function(subject) {
	return is.object(subject) || is.array(subject) || is.string(subject);
};

/**
 * @param {*} subject
 * @return {boolean}
 */
collection.empty = function(subject) {
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
collection.notEmpty = function(subject) {
	if (is.array(subject)) {
		return !is.array.empty(subject);
	} else if (is.object(subject)) {
		return !is.object.empty(subject);
	} else if (is.string(subject)) {
		return !is.string.empty(subject)
	}
	
	return false;
};


var is = {
	array: array,
	object: object,
	string: string,
	numeric: numeric,
	collection: collection,
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	number: function (subject) {
		return toString.call(subject) === '[object Number]';
	},

	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	bool: function (subject) {
		return toString.call(subject) === '[object Boolean]';
	},
	
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	defined: function(subject) {
		return typeof subject !== 'undefined';
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	undefined: function(subject) {
		return typeof subject === 'undefined';
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	function: function(subject) {
		return toString.call(subject) === '[object Function]';
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	NaN: function(subject) {
		return isNaN(subject) && toString.call(subject) === '[object Number]';
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	infinite: function(subject) {
		return Number.POSITIVE_INFINITY === subject || Number.NEGATIVE_INFINITY === subject;
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	null: function(subject) {
		return subject === null;
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	jsObject: function(subject) {
		return subject instanceof Object;
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	jsPrimitive: function(subject) {
		return !is.jsObject(subject);
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	empty: function(subject) {
		if (is.collection(subject)) {
			return is.collection.empty(subject);
		}
		
		throw 'Subject is not Array, Object or String';
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	json: function(subject) {
		if (!is.string(subject)) {
			return false;
		}
		
		try {
			JSON.parse(subject);
			return true;
		} catch (e) {
			return false;
		}
	},
	
	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	false: function(subject) {
		return subject === false || 
			subject === 0 || 
			subject === null || 
			is.undefined(subject) || 
			is.collection.empty(subject) || 
			is.NaN(subject);
	},

	/**
	 * @param {*} subject
	 * @returns {boolean}
	 */
	true: function(subject) {
		return !is.false(subject);
	}
};


module.exports = is;