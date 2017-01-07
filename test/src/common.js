'use strict';


const is = require('../../src/is');
const assert = require('chai').assert;


const TEST_SUBJECTS = {
	'empty array':			[],
	'array':				[1, 2],
	'empty object':			{},
	'object':				{'a': 'b'},
	'empty string':			'',
	'string':				'abc',
	'zero':					0,
	'number':				123,
	'negative':				-123,
	'float':				1.2,
	'negative float':		-1.2,
	'NaN':					NaN,
	'Infinity':				Infinity,
	'negative Infinity':    -Infinity,
	'true':					true,
	'false':				false,
	'true object':			new Boolean(true),
	'null':					null,
	'function':				() => {}
};

const TEST_KEYS = Object.keys(TEST_SUBJECTS);


/**
 * @param {function(*): boolean} callback
 * @param {string[]} keys
 * @param {string[]} ignoreKeys
 */
function assertTrueFor(callback, keys, ignoreKeys = []) {
	let keysMap = keys.reduce((obj, key) => { obj[key] = true; return obj; } , {});
	let ignoreMap = ignoreKeys.reduce((obj, key) => { obj[key] = true; return obj; } , {});
	
	TEST_KEYS.forEach((key) => {
		if (is.defined(ignoreMap[key])) {
			return;
		}
		
		let result = callback(TEST_SUBJECTS[key]);
		
		
		if (is.defined(keysMap[key])) {
			assert.isTrue(result);
		} else {
			assert.isFalse(result);
		}
	})
}

/**
 * @param {function(*): boolean} callback
 * @param {string[]} keys
 * @param {string[]} ignoreKeys
 */
function assertFalseFor(callback, keys, ignoreKeys = []) {
	let keysMap = keys.reduce((obj, key) => { obj[key] = true; return obj; } , {});
	let keysForTrueResult = TEST_KEYS.reduce(
		(arr, key) => { 
			if (is.undefined(keysMap[key])) {
				arr.push(key);
			}
			
			return arr;
		}, []);
	
	assertTrueFor(callback, keysForTrueResult, ignoreKeys);
}

/**
 * @param {function(*): boolean} callback
 * @param {string[]} keys
 * @param {string[]} ignoreKeys
 */
function assertExceptionFor(callback, keys, ignoreKeys = []) {
	let keysMap = keys.reduce((obj, key) => { obj[key] = true; return obj; } , {});
	let ignoreMap = ignoreKeys.reduce((obj, key) => { obj[key] = true; return obj; } , {});
	
	TEST_KEYS.forEach((key) => {
		if (is.defined(ignoreMap[key])) {
			return;
		}
		
		assert.throws(function() { callback(TEST_SUBJECTS[key]); });
	})
}


module.exports = {
	TEST_SUBJECTS: TEST_SUBJECTS,
	TEST_KEYS: TEST_KEYS,
	
	assertTrueFor: assertTrueFor,
	assertFalseFor: assertFalseFor,
	assertExceptionFor: assertExceptionFor,
};