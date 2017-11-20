namespace('Plankton', function (root)
{
	var is = root.Plankton.is;
	
	
	/**
	 * @class Plankton.array
	 * @alias array
	 * 
	 * @param {*} subject
	 * @return {Array}
	 */
	var array = function(subject)
	{
		if (is.undefined(subject))
			return [];
		
		return (is.array(subject) ? subject : [subject]);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)|*=} b
	 */
	array.foreach = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		array.foreach.key(subject, scope, function(key)
		{
			return callback.call(this, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)} callback
	 * @param {*=} scope
	 */
	array.foreach.value = array.foreach;
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)|*} callback
	 * @param {function(Number)|*=} b
	 */
	array.foreach.key = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		for (var key in subject)
		{
			if (!is.index(key))
				continue;
			
			if (callback.call(scope, parseInt(key)) === false)
			{
				break;
			}
		}
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Number)|*} callback
	 * @param {function(Number)|*=} b
	 */
	array.foreach.pair = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		array.foreach.key(subject, scope, function(key)
		{
			return callback.call(this, key, subject[key]);
		});
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(Array)} callback
	 * @param {function(Number)|*=} b
	 */
	array.foreach.item = function(subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		array.foreach.pair(subject, scope, function(key, value)
		{
			var obj = {};
			obj[key] = value;
			return callback.call(scope, obj);
		});
	};
	
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.last = function (subject)
	{
		if (subject.length === 0)
			return undefined;
		
		return subject[subject.length - 1];
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.last.key = function (subject)
	{
		if (subject.length === 0)
			return undefined;
		
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
	array.first = function (subject)
	{
		var first = undefined;
		
		array.foreach.value(subject, function(value)
		{
			first = value;
			return false;
		});
		
		return first;
	};
	
	/**
	 * @param {Array} subject
	 * @return {Number|undefined}
	 */
	array.first.key = function (subject)
	{
		var first = undefined;
		
		array.foreach.key(subject, function(value)
		{
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
	array.count = function (subject)
	{
		var count = 0;
		array.foreach(subject, function() { count++; });
		return count;
	};
	
	/**
	 * @param {Array} subject
	 * @returns {boolean}
	 */
	array.isNormalized = function (subject)
	{
		return subject.length === 0 || array.last.key(subject) === (array.count(subject) - 1);
	};
	
	/**
	 * @param {Array} subject
	 * @returns {Array}
	 */
	array.normalize = function (subject)
	{
		var arr = [];
		
		array.foreach(subject, function(value)
		{
			arr.push(value);
		});
		
		return arr;
	};
	
	/**
	 * @param {Array} subject
	 * @return {*}
	 */
	array.unique = function (subject)
	{
		return subject.filter(function(value, index, array)
		{
			return array.indexOf(value) === index;
		});
	};
	
	
	this.array = array;
});