'use strict';


const as = require('../../src/as');
const array = require('../../src/array');
const func = require('../../src/func');
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
	
	test('as.array', function() {
		assert.equal(as.array, array); 
	});
	
	test('as.func', function() {
		assert.equal(as.func, func); 
	});
	
	test('as.async', function() {
		assert.equal(as.async, func.async); 
	});
});