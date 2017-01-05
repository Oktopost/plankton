'use strict';


const is = require('../../src/is');
const assert = require('chai').assert;


suite('is module', function() {
	
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
				test('(' + key + ') must be true', function() { 
					assert.isTrue(result); 
				});
			} else {
				test(key + ' must be false', function() { 
					assert.isFalse(result);
				});
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
	
	
	suite('is.array', function() {
		assertTrueFor(is.array, [
			'empty array',
			'array'
		]);
	});
	
	suite('is.array.empty', function() {
		assertTrueFor(is.array.empty, [
			'empty array'
		]);
	});
	
	suite('is.array.notEmpty', function() {
		assertTrueFor(is.array.notEmpty, [
			'array'
		]);
	});
	
	
	suite('is.object', function() {
		assertTrueFor(is.object, [
			'empty object',
			'object'
		]);
	});
	
	suite('is.object.empty', function() {
		assertTrueFor(is.object.empty, [
			'empty object'
		]);
	});
	
	suite('is.object.notEmpty', function() {
		assertTrueFor(is.object.notEmpty, [
			'object'
		]);
	});
	
	
	suite('is.string', function() {
		assertTrueFor(is.string, [
			'empty string',
			'string'
		]);
	});
	
	suite('is.string.empty', function() {
		assertTrueFor(is.string.empty, [
			'empty string'
		]);
	});
	
	suite('is.string.notEmpty', function() {
		assertTrueFor(is.string.notEmpty, [
			'string'
		]);
	});
	
	
	suite('is.number', function() {
		assertTrueFor(is.number, [
			'zero',
			'number',
			'negative',
			'float',
			'negative float'
		]);
	});
	
	suite('is.number.int', function() {
		assertTrueFor(is.number.int, [
			'zero',
			'number',
			'negative'
		]);
	});
	
	suite('is.number.float', function() {
		assertTrueFor(is.number.float, [
			'float',
			'negative float'
		]);
	});
	
	suite('is.number.odd', function() {
		assertTrueFor(
			is.number.odd, 
			[],
			['number', 'negative']);
		
		test('odd number is true', function() { 
			assert.isTrue(is.number.odd(7));
			assert.isTrue(is.number.odd(-7));
		});
		
		test('even number is false', function() { 
			assert.isFalse(is.number.odd(20));
			assert.isFalse(is.number.odd(-20));
		});
	});
	
	suite('is.number.even', function() {
		assertTrueFor(
			is.number.even, 
			['zero'],
			['number', 'negative']);
		
		test('even number is true', function() { 
			assert.isTrue(is.number.even(20)); 
			assert.isTrue(is.number.even(-20));
		});
		
		test('odd number is false', function() { 
			assert.isFalse(is.number.even(7)); 
			assert.isFalse(is.number.even(-7));
		});
	});
	
	suite('is.defined', function() {
		assertFalseFor(is.defined, [
			'undefined'
		]);
	});
	
	suite('is.undefined', function() {
		assertTrueFor(is.undefined, [
			'undefined'
		]);
	});
	
	suite('is.function', function() {
		assertTrueFor(is.function, [
			'function'
		]);
	});
	
	suite('is.NaN', function() {
		assertTrueFor(is.NaN, [
			['NaN']
		]);
	});
	
	suite('is.infinite', function() {
		assertTrueFor(is.infinite, [
			'Infinity', 
			'negative Infinity',
		]);
	});
	
	suite('is.null', function() {
		assertTrueFor(is.null, [
			'null',
		]);
	});
	
	suite('is.null', function() {
		assertTrueFor(is.null, [
			'null',
		]);
	});
});