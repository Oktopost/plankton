namespace('Plankton', function (root) 
{
	var is		= root.Plankton.is;
	var obj		= root.Plankton.obj;
	var array	= root.Plankton.array;
	
	
	function getForEachForSubject(subject)
	{
		if (is.array(subject))
		{
			return array.foreach;
		}
		else if (is.jsObject(subject))
		{
			return obj.foreach;
		}
		else if (is.undefined(subject))
		{
			return array.foreach;
		}
		else
		{
			throw Error('Subject must be Array or Object');
		}
	}
	
	
	/**
	 * @class Plankton.foreach
	 * @alias foreach
	 * 
	 * @param {Array|Object} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	var foreach = function (subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.value(subject, callback, b);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.value = foreach;
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.key = function (subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.key(subject, callback, b);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.pair = function(subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.pair(subject, callback, b);
	};
	
	/**
	 * @param {Array} subject
	 * @param {function(*)|*} callback
	 * @param {*=} b
	 */
	foreach.item = function(subject, callback, b)
	{
		var method = getForEachForSubject(subject);
		method.item(subject, callback, b);
	};
	
	
	this.foreach = foreach;
});