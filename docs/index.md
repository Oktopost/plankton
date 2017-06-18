# Main Plankton Libraries


## [is](./plankton/is.md)

> Library `oktopost-plankton-is`

A collection of functions to determine the type or state of a variable

```js
var a;

is.defined(a);				// false
is.function(function() {});	// true
is.array([1, 2, 3]);		// true
is.array.empty([1, 2, 3]);	// false
```

## [as](./plankton/as.md)

> Library `oktopost-plankton-as`

A collection of functions for converting a variable into a specific type. 

```js
as.bool(undefined);		// false
as.bool(23);			// false
as.array(1);			// [1]
as.array([1]);			// [1]
```

## [array](./plankton/array.md)

> Library `oktopost-plankton-array`

A collection of functions for working with arrays.

```js
var a = [];
a[0] = 2;
a[100] = 3;

array.first(['a', 'b', 'c']);		// 'a'
array.last.key(a);					// 100
array.count(a);						// 2
array.normalize(a);					// [0: 2, 1: 3]
```

## [obj](./plankton/obj.md)

> Library `oktopost-plankton-obj`

A collection of functions for working with objects.

```js
obj.merge({a: 1}, {b: 2}, {c: 3});	// {a: 1, b: 2, c: 3}
obj.combine('a', 2);				// {a: 2}
obj.values({a: 1, b: 2});			// [1, 2]
obj.count({a: 1, b: 2});			// 2
```

## [func](./plankton/func.md)

> Library `oktopost-plankton-func`

A collection of decorators for JavaScript functions.

```js
func(23);	// function() { return 23; }

// Target function is executed only once.
// Return value is cached, and always returned.
var newFunc = func.cached(function () { return 2 * 3; });

// Delay the call of a function by given amount of milliseconds. 
var postponedFunc = func.postponed(function () { console.log(); }, 1000);
```

## [foreach](./plankton/foreach.md)

> Library `oktopost-plankton-foreach`

An implementation of the foreach loop.

```js
foreach([1, 2, 3], function (value) 
{
	console.log(value); // 1, 2, 3
});

foreach.key({a: 1, b: 2}, function (key) 
{
	console.log(key); // 'a', 'b'
});

foreach.pair(['a', 'b'], function (key, value) 
{
	console.log(key + ' => ' + value); // 0 => 'a', 1 => 'b'
});
```


# Extra Libraries

## [oktopost-plankton-url](./plankton/url.md)
