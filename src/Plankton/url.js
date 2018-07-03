namespace('Plankton', function(root)
{
	var is		= root.Plankton.is;
	var foreach	= root.Plankton.foreach;
	
	
	/**
	 * @class Plankton.url
	 * @alias url
	 */
	var url = {};


	/**
	 * @param {string|*} path
	 * @param {{}=} params
	 * @returns {string}
	 */
	url.encode = function (path, params)
	{
		var queryParams	= {};
		var link		= path.toString();
		var encodedLink	= '';
		var addSlash	= false;
		var queryParts	= [];
		
		params = params || {};
		
		foreach.pair(params, function (key, value)
		{
			if (is.bool(value))
			{
				params[key] = (value ? '1' : '0');
			}
		});
		
		foreach.pair(params, function (key, value)
		{
			if (link.indexOf('{' + key + '}') === -1)
			{
				queryParams[key] = value;
				return;
			}
			
			link = link.replace(new RegExp('{' + key + '}', 'g'), value.toString());
		});
		
		foreach(link.split('/'), function (part)
		{
			if (addSlash)
			{
				encodedLink += '/';
			}
			else
				{
				addSlash = true;
			}
			
			encodedLink += encodeURIComponent(part);
		});
		
		if (!is(queryParams))
		{
			return encodedLink;
		}
		
		foreach.pair(queryParams, function (key, value)
		{
			queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		});
		
		return encodedLink + '?' + queryParts.join('&');
	};

	/**
	 * @param {string} url
	 * @returns {{ uri: string, path: string[], params: {} }}
	 */
	url.decode = function (url)
	{
		var data	= url.split('#', 1)[0].split('?');
		var path	= [];
		var params	= {};
		var uri		= data[0];
		
		
		if (data.length === 1)
		{
			data = [ data[0], '' ];
		}
		else if (data.length > 2)
		{
			data = [ data[0], data.splice(1).join('?') ];
		}
		
		foreach(data[0].split('/'), function (pathPart)
		{
			if (pathPart.length !== 0)
			{
				path.push(decodeURIComponent(pathPart));
			}
		});
		
		foreach(data[1].split('&'), function (queryExpression)
		{
			var query	= queryExpression.split('=');
			var key		= decodeURIComponent(query[0]);
			var value;
			
			if (key.length === 0)
			{
				return;	
			}
			else if (query.length === 1)
			{
				value = '';
			}
			else if (query.length > 2)
			{
				value = decodeURIComponent(query.splice(1).join('='));
			}
			else
			{
				value = decodeURIComponent(query[1]);
			}
			
			params[key] = value;
		});
		
		return {
			uri:	uri,
			path:	path,
			params:	params
		};
	};
	
	
	this.url = url;
});