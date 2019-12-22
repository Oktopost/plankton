namespace('Plankton', function (root)
{
	var is = root.Plankton.is;
	
	
	/**
	 * @class Plankton.obj
	 * @alias obj
	 */
	var obj = {};
	
	
	/**
	 * @param {Object} subject
	 * @return {Object}
	 */
	obj.copy = function (subject)
	{
		var res = {};
		obj.foreach.pair(subject, function (key, val) { res[key] = val; });
		return res;
	};
	
	/**
	 * @param {Object} subject
	 * @return {Object}
	 */
	obj.mix = function (subject)
	{
		for (var i = 1; i < arguments.length; i++)
		{
			obj.foreach.pair(arguments[i], function (key, val) { subject[key] = val; });
		}
		
		return subject;
	};
	
	/**
	 * @return {Object}
	 */
	obj.merge = function ()
	{
		var res = {};
		
		for (var i = 0; i < arguments.length; i++)
		{
			obj.foreach.pair(arguments[i], function (key, val) { res[key] = val; });
		}
		
		return res;
	};
	
	/**
	 * @param {string|number} key
	 * @param {*} value
	 * @returns {Object}
	 */
	obj.combine = function (key, value)
	{
		var res = {};
		res[key] = value;
		return res;
	};
	
	/**
	 * @param subject
	 * @returns {*|undefined}
	 */
	obj.any = function (subject)
	{
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
	obj.any.key = function (subject)
	{
		var keys = obj.keys(subject);
		return keys.length > 0 ? keys[0] : undefined;
	};
	
	/**
	 * @param {Object} subject
	 * @return {*|undefined}
	 */
	obj.any.item = function (subject)
	{
		var key = obj.any.key(subject);
		var res = undefined;
		
		if (is.defined(key))
		{
			res = obj.combine(key, subject[key]);
		}
		
		return res;
	};
	
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.key(subject, scope, function (key) 
		{
			return callback.call(scope, subject[key]);
		});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.value = obj.foreach;
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.key = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		for (var key in subject)
		{
			if (!subject.hasOwnProperty(key))
			{
				continue;
			}
			
			if (callback.call(scope, key) === false)
			{
				break;
			}
		}
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.pair = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.key(subject, scope, function (key)
		{
			return callback.call(this, key, subject[key]);
		});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 */
	obj.foreach.item = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.pair(subject, scope, function (key, value)
		{
			return callback.call(this, obj.combine(key, value));
		});
	};
	
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		return obj.filter.pair(subject, scope, function (key, value)
		{
			return callback.call(this, value);
		})
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.value = obj.filter;
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.key = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		return obj.filter.pair(
			subject, 
			scope,
			function (key)
			{
				return callback.call(this, key);
			});
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.pair = function (subject, callback, b)
	{
		var filtered = {};
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		obj.foreach.pair(
			subject, 
			scope,
			function (key, value)
			{
				var res = callback.call(this, key, value);
				
				if (is.null(res))
				{
					return false;
				}
				else if (res === true)
				{
					filtered[key] = value;
				}
			});
		
		return filtered;
	};
	
	/**
	 * @param {Object} subject
	 * @param {function(*)|*} callback
	 * @param {function(*)} b
	 * @returns {Object}
	 */
	obj.filter.item = function (subject, callback, b)
	{
		var scope = is.defined(b) ? callback : null;
		callback = is.defined(b) ? b : callback;
		
		return obj.filter.pair(
			subject, 
			scope,
			function (key, value)
			{
				return callback.call(scope, obj.combine(key, value));
			});
	};
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	obj.values = function (subject)
	{
		return obj
			.keys(subject)
			.reduce(
				function (result, key)
				{
					result.push(subject[key]);
					return result;
				}, 
				[]);
	};
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	obj.keys = function (subject)
	{
		return Object.keys(subject);
	};
	
	/**
	 * @param {Object} subject
	 * @returns {Array}
	 */
	obj.count = function (subject)
	{
		return obj.keys(subject).length;
	};

	/**
	 * @param {Object} subject
	 * @param {Array|String} path
	 * @param {*} def
	 * @returns {*}
	 */
	obj.path = function (subject, path, def)
	{
		if (is.false(subject))
			return def;

		if (is.false(path))
			return def;

		if (is.string(path))
		{
			path = path.split('.');
		}

		var cursor = subject;

		obj.foreach(path, function (p)
		{
			cursor = cursor[p];
			return is.defined(cursor);
		});

		return is.undefined(cursor) ? def : cursor;
	};
	
	
	this.obj = obj;
});