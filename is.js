'use strict';


var array = function(subject) {
	return toString.call(subject) === '[object Array]';
};

array.empty = function(subject) {
	return is.array(subject) && subject.length === 0;
};
	
array.notEmpty = function(subject) {
	return is.array(subject) && subject.length === 0;
};


var object = function(subject) {
	return toString.call(subject) === '[object Object]';
};

object.empty = function(subject) {
	return is.object(subject) && Object.keys(subject).length === 0;
};
	
object.notEmpty = function(subject) {
	return is.object(subject) && Object.keys(subject).length > 0;
};


var string = function(subject) {
	return toString.call(subject) === '[object String]';
};

string.empty = function(subject) {
	return is.string(subject) && subject.length === 0;
};
	
string.notEmpty = function(subject) {
	return is.string(subject) && subject.length > 0;
};


var number = function(subject) {
	return toString.call(subject) === '[object Number]' && !is.infinite(subject) && !isNaN(subject);
};

number.int = function(subject) {
	return is.number(subject) && (subject % 1 === 0);
};

number.float = function(subject) {
	return is.number(subject) && (subject % 1 !== 0);
};


var is = {
	array: array,
	string: string,
	number: number,
	object: object,
	
	
	defined: function(subject) {
		return typeof subject !== 'undefined';
	},
	
	undefined: function(subject) {
		return typeof subject === 'undefined';
	},
	
	function: function(subject) {
		return toString.call(subject) === '[object Function]';
	},
	
	NaN: function(subject) {
		return isNaN(subject) && toString.call(subject) === '[object Number]';
	},
	
	infinite: function(subject) {
		return Number.POSITIVE_INFINITY === subject || Number.NEGATIVE_INFINITY === subject;
	},
	
	null: function(subject) {
		return subject === null;
	},
	
	jsObject: function(subject) {
		return subject instanceof Object;
	},
	
	jsPrimitive: function(subject) {
		return !is.jsObject(subject);
	},
	
	empty: function(subject) {
		return (is.array(subject) && is.array.empty(subject)) || 
			(is.object(subject) && is.object.empty(subject)) || 
			(is.string(subject) && is.string.empty(subject));
	},
	
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
	
	false: function(subject) {
		return subject === false || 
			subject === 0 || 
			subject === null || 
			is.undefined(subject) || 
			is.empty(subject) || 
			is.NaN(subject);
	}
};


module.exports = is;