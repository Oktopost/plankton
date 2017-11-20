# Plankton

[![NPM Version](https://img.shields.io/npm/v/oktopost-plankton.svg)](https://www.npmjs.com/package/oktopost-plankton)
[![Build Status](https://travis-ci.org/Oktopost/plankton.svg?branch=master)](https://travis-ci.org/Oktopost/plankton)
[![Coverage Status](https://coveralls.io/repos/github/Oktopost/plankton/badge.svg?branch=master)](https://coveralls.io/github/Oktopost/plankton?branch=master)

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