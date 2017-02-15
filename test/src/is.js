'use strict';


const is = require('../../src/is');
const assert = require('chai').assert;
const common = require('./common');


suite('is module', function() {
	test('is', function() {
		common.assertTrueFor(is.true, [
			'array',
			'object',
			'string',
			'number',
			'negative',
			'float',
			'negative float',
			'Infinity',
			'negative Infinity',
			'true',
			'true object',
			'function'
		]);
	});
	
	
	test('is.bool', function() {
		common.assertTrueFor(is.bool, [
			'true',
			'true object',
			'false'
		]);
	});
	
	
	test('is.array', function() {
		common.assertTrueFor(is.array, [
			'empty array',
			'array'
		]);
	});
	
	test('is.array.empty', function() {
		common.assertTrueFor(is.array.empty, [
			'empty array'
		]);
	});
	
	test('is.array.notEmpty', function() {
		common.assertTrueFor(is.array.notEmpty, [
			'array'
		]);
	});
	
	
	test('is.object', function() {
		common.assertTrueFor(is.object, [
			'empty object',
			'object'
		]);
	});
	
	test('is.object.empty', function() {
		common.assertTrueFor(is.object.empty, [
			'empty object'
		]);
	});
	
	test('is.object.notEmpty', function() {
		common.assertTrueFor(is.object.notEmpty, [
			'object'
		]);
	});
	
	
	test('is.string', function() {
		common.assertTrueFor(is.string, [
			'empty string',
			'string'
		]);
	});
	
	test('is.string.empty', function() {
		common.assertTrueFor(is.string.empty, [
			'empty string'
		]);
	});
	
	test('is.string.notEmpty', function() {
		common.assertTrueFor(is.string.notEmpty, [
			'string'
		]);
	});
	
	
	test('is.numeric', function() {
		common.assertTrueFor(is.numeric, [
			'zero',
			'number',
			'negative',
			'float',
			'negative float'
		]);
	});
	
	test('is.numeric.int', function() {
		common.assertTrueFor(is.numeric.int, [
			'zero',
			'number',
			'negative'
		]);
	});
	
	test('is.numeric.float', function() {
		common.assertTrueFor(is.numeric.float, [
			'float',
			'negative float'
		]);
	});
	
	suite('is.numeric.odd', function() {
		test('not numeric type', function() {
			common.assertTrueFor(
				is.numeric.odd, 
				[],
				['number', 'negative']);
		});
		
		test('odd numeric is true', function() { 
			assert.isTrue(is.numeric.odd(7));
			assert.isTrue(is.numeric.odd(-7));
		});
		
		test('even numeric is false', function() { 
			assert.isFalse(is.numeric.odd(20));
			assert.isFalse(is.numeric.odd(-20));
		});
	});
	
	suite('is.numeric.even', function() {
		test('not numeric type', function() {
			common.assertTrueFor(
				is.numeric.even, 
				['zero'],
				['number', 'negative']);
		});
		
		test('even numeric is true', function() { 
			assert.isTrue(is.numeric.even(20)); 
			assert.isTrue(is.numeric.even(-20));
		});
		
		test('odd numeric is false', function() { 
			assert.isFalse(is.numeric.even(7)); 
			assert.isFalse(is.numeric.even(-7));
		});
	});
	
	
	test('is.number', function() {
		common.assertTrueFor(is.number, [
			'zero',
			'number',
			'negative',
			'float',
			'negative float',
			'NaN',
			'Infinity',
			'negative Infinity'
		]);
	});
	
	
	test('is.defined', function() {
		common.assertFalseFor(is.defined, [
			'undefined'
		]);
	});
	
	test('is.undefined', function() {
		common.assertTrueFor(is.undefined, [
			'undefined'
		]);
	});
	
	test('is.function', function() {
		common.assertTrueFor(is.function, [
			'function'
		]);
	});
	
	test('is.NaN', function() {
		common.assertTrueFor(is.NaN, [
			['NaN']
		]);
	});
	
	test('is.infinite', function() {
		common.assertTrueFor(is.infinite, [
			'Infinity', 
			'negative Infinity'
		]);
	});
	
	test('is.null', function() {
		common.assertTrueFor(is.null, [
			'null'
		]);
	});
	
	test('is.true', function() {
		common.assertTrueFor(is.true, [
			'array',
			'object',
			'string',
			'number',
			'negative',
			'float',
			'negative float',
			'Infinity',
			'negative Infinity',
			'true',
			'true object',
			'function'
		]);
	});
	
	test('is.false', function() {
		common.assertFalseFor(is.false, [
			'array',
			'object',
			'string',
			'number',
			'negative',
			'float',
			'negative float',
			'Infinity',
			'negative Infinity',
			'true',
			'true object',
			'function'
		]);
	});
	
	suite('is.empty', function() {
		
		test('on empty set', function() {
			assert.isTrue(is.empty([]));
			assert.isTrue(is.empty({}));
			assert.isTrue(is.empty(''));
		});
		
		test('on not empty set', function () {
			assert.isFalse(is.empty([1]));
			assert.isFalse(is.empty({'a': 1}));
			assert.isFalse(is.empty('b'));
		});
		
		test('not sets return false', function () {
			common.assertExceptionFor(is.empty, common.TEST_KEYS, [
				'empty array',
				'array',
				'empty object',
				'object',
				'empty string',
				'string'
			]);
		});
	});
	
	suite('is.json', function() {
		test('json string', function() {
			assert.isTrue(is.json('"a"'));
			assert.isTrue(is.json('true'));
			assert.isTrue(is.json('1'));
			assert.isTrue(is.json('[]'));
			assert.isTrue(is.json('{}'));
			assert.isTrue(is.json('{"a":"b"}'));
		});
		
		test('invalid string', function() {
			assert.isFalse(is.json('{"a":}'));
		});
		
		test('invalid subject', function() {
			common.assertFalseFor(is.json, common.TEST_KEYS, [
				'empty string',
				'string'
			]);
		});
	});
	
	
	test('is.jsPrimitive', function() {
		common.assertTrueFor(is.jsPrimitive, [
			'empty string',
			'string',
			'zero',
			'number',
			'negative',
			'float',
			'negative float',
			'NaN',
			'Infinity',
			'negative Infinity',
			'true',
			'false',
			'null'
		]);
		
		assert.isFalse(is.jsPrimitive(new String()));
		assert.isFalse(is.jsPrimitive(new Number()));
		assert.isFalse(is.jsPrimitive(new Boolean()));
	});
	
	
	test('is.jsObject', function() {
		common.assertFalseFor(is.jsObject, [
			'empty string',
			'string',
			'zero',
			'number',
			'negative',
			'float',
			'negative float',
			'NaN',
			'Infinity',
			'negative Infinity',
			'true',
			'false',
			'null'
		]);
		
		assert.isTrue(is.jsObject(new String()));
		assert.isTrue(is.jsObject(new Number()));
		assert.isTrue(is.jsObject(new Boolean()));
	});
	
	
	test('is.index', function() {
		assert.isTrue(is.index('1'));
		assert.isTrue(is.index(1));
		
		assert.isFalse(is.index(-123));
		assert.isFalse(is.index('01'));
		assert.isFalse(is.index(''));
		assert.isFalse(is.index(undefined));
		assert.isFalse(is.index(true));
	});
});