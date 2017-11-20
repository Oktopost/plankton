const is = require('../../index').is;
const assert = require('chai').assert;
const common = require('./common');


suite('is module', function()
{
	test('is', function()
	{
		common.assertTrueFor(is, [
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
			'function',
			'instance',
			'create instance'
		]);
	});
	
	
	test('is.true', function()
	{
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
			'function',
			'instance',
			'create instance'
		]);
	});
	
	
	test('is.bool', function()
	{
		common.assertTrueFor(is.bool, [
			'true',
			'true object',
			'false'
		]);
	});
	
	
	test('is.array', function()
	{
		common.assertTrueFor(is.array, [
			'empty array',
			'array'
		]);
	});
	
	test('is.array.empty', function()
	{
		common.assertTrueFor(is.array.empty, [
			'empty array'
		]);
	});
	
	test('is.array.notEmpty', function()
	{
		common.assertTrueFor(is.array.notEmpty, [
			'array'
		]);
	});
	
	
	test('is.object', function()
	{
		common.assertTrueFor(is.object, [
			'empty object',
			'object',
			'instance',
			'null instance',
			'create instance',
			'literal instance'
		]);
	});
	
	test('is.object.empty', function()
	{
		common.assertTrueFor(is.object.empty, [
			'empty object',
			'instance',
			'null instance',
			'literal instance',
			'create instance'
		]);
	});
	
	test('is.object.notEmpty', function()
	{
		common.assertTrueFor(is.object.notEmpty, [
			'object'
		]);
	});
	
	test('is.objectLiteral', function()
	{
		common.assertTrueFor(is.objectLiteral, [
			'empty object',
			'object',
			'null instance',
			'literal instance'
		]);
	});
	
	
	test('is.string', function()
	{
		common.assertTrueFor(is.string, [
			'empty string',
			'string'
		]);
	});
	
	test('is.string.empty', function()
	{
		common.assertTrueFor(is.string.empty, [
			'empty string'
		]);
	});
	
	test('is.string.notEmpty', function()
	{
		common.assertTrueFor(is.string.notEmpty, [
			'string'
		]);
	});
	
	
	test('is.collection', () =>
	{
		common.assertTrueFor(is.collection, [
			'empty string',
			'string',
			'empty object',
			'object',
			'empty array',
			'array',
			'null instance',
			'literal instance'
		]);
	});
	
	test('is.empty', () =>
	{
		assert.strictEqual(is.empty, is.collection.empty)
	});
	
	test('is.notEmpty', () =>
	{
		assert.strictEqual(is.empty, is.collection.empty)
	});
	
	test('is.collection.empty', () => 
	{
		common.assertTrueFor(is.collection.empty, [
			'empty string',
			'empty object',
			'empty array',
			'null instance',
			'literal instance'
		]);
	});
	
	test('is.collection.notEmpty', () =>
	{
		common.assertTrueFor(is.collection.notEmpty, [
			'string',
			'object',
			'array'
		]);
	});
	
	
	test('is.numeric', () =>
	{
		common.assertTrueFor(is.numeric, [
			'zero',
			'number',
			'negative',
			'float',
			'negative float'
		]);
	});
	
	test('is.numeric.int', () =>
	{
		common.assertTrueFor(is.numeric.int, [
			'zero',
			'number',
			'negative'
		]);
	});
	
	test('is.numeric.float', () =>
	{
		common.assertTrueFor(is.numeric.float, [
			'float',
			'negative float'
		]);
	});
	
	suite('is.numeric.odd', () =>
	{
		test('not numeric type', () =>
		{
			common.assertTrueFor(
				is.numeric.odd, 
				[],
				['number', 'negative']);
		});
		
		test('odd numeric is true', () =>
		{ 
			assert.isTrue(is.numeric.odd(7));
			assert.isTrue(is.numeric.odd(-7));
		});
		
		test('even numeric is false', () =>
		{ 
			assert.isFalse(is.numeric.odd(20));
			assert.isFalse(is.numeric.odd(-20));
		});
	});
	
	suite('is.numeric.even', () =>
	{
		test('not numeric type', () =>
		{
			common.assertTrueFor(
				is.numeric.even, 
				['zero'],
				['number', 'negative']);
		});
		
		test('even numeric is true', () =>
		{ 
			assert.isTrue(is.numeric.even(20)); 
			assert.isTrue(is.numeric.even(-20));
		});
		
		test('odd numeric is false', () =>
		{ 
			assert.isFalse(is.numeric.even(7)); 
			assert.isFalse(is.numeric.even(-7));
		});
	});
	
	
	test('is.number', () =>
	{
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
	
	
	test('is.defined', () =>
	{
		common.assertFalseFor(is.defined, [
			'undefined'
		]);
	});
	
	test('is.undefined', () =>
	{
		common.assertTrueFor(is.undefined, [
			'undefined'
		]);
	});
	
	test('is.function', () =>
	{
		common.assertTrueFor(is.function, [
			'function'
		]);
	});
	
	test('is.NaN', () =>
	{
		common.assertTrueFor(is.NaN, [
			['NaN']
		]);
	});
	
	test('is.infinite', () =>
	{
		common.assertTrueFor(is.infinite, [
			'Infinity', 
			'negative Infinity'
		]);
	});
	
	test('is.null', () =>
	{
		common.assertTrueFor(is.null, [
			'null'
		]);
	});
	
	test('is.true', () =>
	{
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
			'function',
			'instance',
			'create instance'
		]);
	});
	
	test('is.false', () =>
	{
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
			'function',
			'instance',
			'create instance'
		]);
	});
	
	suite('is.empty', () =>
	{
		test('on empty set', () =>
		{
			assert.isTrue(is.empty([]));
			assert.isTrue(is.empty({}));
			assert.isTrue(is.empty(new Object(null)));
			assert.isTrue(is.empty(new Object({})));
			assert.isTrue(is.empty(''));
		});
		
		test('on not empty set', () => 
		{
			assert.isFalse(is.empty([1]));
			assert.isFalse(is.empty({'a': 1}));
			assert.isFalse(is.empty('b'));
			assert.isFalse(is.empty(new Object({a: 1})));
		});
		
		test('not sets returns false', function () {
			common.assertFalseFor(is.empty, common.TEST_KEYS, [
				'empty array',
				'array',
				'empty object',
				'object',
				'empty string',
				'string',
				'null instance',
				'literal instance'
			]);
		});
	});
	
	suite('is.json', () =>
	{
		test('json string', () =>
		{
			assert.isTrue(is.json('"a"'));
			assert.isTrue(is.json('true'));
			assert.isTrue(is.json('1'));
			assert.isTrue(is.json('[]'));
			assert.isTrue(is.json('{}'));
			assert.isTrue(is.json('{"a":"b"}'));
		});
		
		test('invalid string', () =>
		{
			assert.isFalse(is.json('{"a":}'));
		});
		
		test('invalid subject', () =>
		{
			common.assertFalseFor(is.json, common.TEST_KEYS, [
				'empty string',
				'string'
			]);
		});
	});
	
	suite('is.regex', function()
	{
		test('Regex object used, return true', () => 
		{
			assert.isTrue(is.regex(new RegExp()));
		});
		
		test('valid string used, return true', () => 
		{
			assert.isTrue(is.regex('/abc/'));
		});
		
		test('invalid string used, return false', () => 
		{
			assert.isFalse(is.regex('/[asd/'));
		});
		
		test('Invalid type used, return false', () => 
		{
			assert.isFalse(is.regex(null));
			assert.isFalse(is.regex(undefined));
			assert.isFalse(is.regex({}));
			assert.isFalse(is.regex(new Boolean()));
		});
	});
	
	
	test('is.jsPrimitive', () =>
	{
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
	
	
	test('is.jsObject', () =>
	{
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
	
	
	test('is.index', () =>
	{
		assert.isTrue(is.index('1'));
		assert.isTrue(is.index(1));
		
		assert.isFalse(is.index(-123));
		assert.isFalse(is.index('01'));
		assert.isFalse(is.index(''));
		assert.isFalse(is.index(undefined));
		assert.isFalse(is.index(true));
	});
});