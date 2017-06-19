# Plankton

Plankton is a collection of utility libraries build for JavaScript. The default libraries of 
this project are included inside the `oktopost-plankton` *NPM* package. 

Full documentation is available **[here](./docs/index.md)**. 

## Libraries

List of default libraries included in the `oktopost-plankton` package.

* [`oktopost-plankton-is`](./docs/plankton/is.md)
* [`oktopost-plankton-as`](./docs/plankton/as.md)
* [`oktopost-plankton-func`](./docs/plankton/func.md)
* [`oktopost-plankton-obj`](./docs/plankton/obj.md)
* [`oktopost-plankton-array`](./docs/plankton/array.md)
* [`oktopost-plankton-foreach`](./docs/plankton/foreach.md)

Additional standalone libraries
 
* [`oktopost-plankton-url`](./docs/plankton/url.md) 

## Installation and Usage

```
npm install oktopost-plankton --save
```

* In node
```js
const is = require('oktopost-plankton').is;
const obj = require('oktopost-plankton').obj;
const foreach = require('oktopost-plankton').foreach;


if (is.defined(myArray))
{
	foreach.key(myArray, function (index)
	{
		console.log('Got index ' + index);
	});
	
	foreach(myArray, function (value)
	{
		console.log('Got value ' + value);
	});
}


let myCollectionKeys = obj.keys(myCollection);
```

* In web Plankton library is registered under `window.Plankton` and can be used as following:

```js
var is = window.Plankton.is;
var obj = window.Plankton.obj;
var foreach = window.Plankton.foreach;

if (is.defined(myArray))
{
	foreach.key(myArray, function (index)
	{
		console.log('Got index ' + index);
	});
	
	foreach(myArray, function (value)
	{
		console.log('Got value ' + value);
	});
}

var myCollectionKeys = obj.keys(myCollection);
```