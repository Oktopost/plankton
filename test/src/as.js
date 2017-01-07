'use strict';


const as = require('../../src/as');
const assert = require('chai').assert;
const common = require('./common');


suite('as module', function() {
	test('as.bool', function() {
		common.assertTrueFor(as.bool, [
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
	
	suite('as.array', function() {
		
		test('undefined', function() {
			assert.deepEqual([], as.array());
		});
		
		test('empty array', function() {
			assert.deepEqual([], as.array([]));
		});
		
		test('already array', function() {
			assert.deepEqual([1, 'abc'], as.array([1, 'abc']));
		});
		
		test('not array', function() {
			assert.deepEqual(['abc'], as.array('abc'));
			assert.deepEqual([null], as.array(null));
			assert.deepEqual([123], as.array(123));
		});
	});
	
	suite('as.func', function() {
		test('subject is function', function() {
			let func = function() {}; 
			
			assert.equal(as.func(func), func);
		});
		
		test('subject is not a function', function() {
			assert.instanceOf(as.func(0), Function);
			assert.equal(as.func('asbasd')(), 'asbasd');
		});
	});
	
	suite('as.async', function() {
		test('not a function', function() {
			assert.instanceOf(as.async(2)(), Promise);
		});
		
		test('function', function() {
			assert.instanceOf(as.async(function() {})(), Promise);
		});
		
		test('function executed async', function() {
			var num = 1;
			
			as.async(function() {
				num = 2;
			})();
			
			assert.equal(num ,1);
		});
	});
});