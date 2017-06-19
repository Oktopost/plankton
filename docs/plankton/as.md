# as Object

[![NPM Version](https://img.shields.io/npm/v/oktopost-plankton-as.svg)](https://www.npmjs.com/package/oktopost-plankton-as)
[![Build Status](https://travis-ci.org/Oktopost/plankton-as.svg?branch=master)](https://travis-ci.org/Oktopost/plankton-as)
[![Coverage Status](https://coveralls.io/repos/github/Oktopost/plankton-as/badge.svg?branch=master)](https://coveralls.io/github/Oktopost/plankton-as?branch=master)

> Library **[`oktopost-plankton-as`](https://github.com/Oktopost/plankton-as)** 

[Full Plankton Documentation](../index.md) 

## Table Of Contents

  * [Installation](#installation)
  * [Functions](#functions)
    * [as.bool(subject)](#asbool-subject)
    * [as.array(subject)](#asarray-subject)
    * [as.func(subject)](#asfunc-subject)
    * [as.async(subject)](#asasync-subject)
    
## Installation

```bash
npm install oktopost-plankton --save
```

## Functions

### as.bool (subject)

Alias to the [`is.true(subject)`](./is.md#istrue-subject) function.
Convert **subject** into a boolean value. 

```js
as.bool([]);			// false
as.bool('');			// false
as.bool(null);			// false
as.bool(undefined);		// false

as.bool(1);				// true
as.bool(-1);			// true
as.bool(true);			// true
as.bool(function() {});	// true
```

### as.array (subject)

Alias to the [`array(subject)`](./array.md#array-subject) function.
If **subject** is not an array, return a new array with **subject** as it's only element. Otherwise return **subject**  itself. 

```js
as.array([]);		// []
as.array([1, 2]);	// [1, 2]
as.array(1);		// [1]
as.array(null);		// [null]


function functionThatWorksWithBulks(value)
{
	value = as.array(value);
	
	foreach (value, function (element)
	{
		// ...
	})
}

functionThatWorksWithBulks('same_result');
functionThatWorksWithBulks(['same_result']);
```


### as.func (subject)

Alias to the [`func(subject)`](./func.md#func-subject) function.
If **subject** is not a function, create a new function which will always return **subject**. Otherwise return **subject** itself.

```js
as.func(function () { return 'result' });	// function () { return 'result'; }
as.func('result');							// function () { return 'result'; }


/**
* @param {function(): number|number} getIdCallback
*/
function functionWithCallback(getIdCallback)
{
	getIdCallback = as.func(getIdCallback);
	
	// ...
}
```


### as.async (subject)

Alias to the [`func.async(subject)`](./func.md#funcasync-subject) function.
Create a new function that when invoked, will call **subject** asynchronously.

```js


function blockingFunction(a)
{
	console.log('3. Running blocking function with a = ' + a);
	// ...
	return 'result returned as promise';
}

var asyncFunction = as.async(blockingFunction);


console.log('1. Before async call');
asyncFunction('value')
	.then(function (result) 
	{
		console.log('4. Result = ' + result);
	});
console.log('2. After async call');


// The output to console will be:
// 1. Before async call
// 2. After async call
// 3. Running blocking function with a = value
// 4. Result = result returned as promise
```