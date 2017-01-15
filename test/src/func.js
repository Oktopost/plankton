'use strict';


const func = require('../../src/func');
const assert = require('chai').assert;
const common = require('./common');


suite('func module', function() {

	suite('func', function() {
		test('subject is function', function() {
			let f = function() {}; 
			
			assert.equal(func(f), f);
		});
		
		test('subject is undefined', function() {
			assert.instanceOf(func(), Function);
			assert.equal((func())(), undefined);
		});
		
		test('subject is not a function', function() {
			assert.instanceOf(func(0), Function);
			assert.equal(func('asbasd')(), 'asbasd');
		});
	});
	
	suite('func.async', function() {
		test('not a function', function() {
			assert.instanceOf(func.async(2)(), Promise);
		});
		
		test('function', function() {
			assert.instanceOf(func.async(function() {})(), Promise);
		});
		
		test('function executed async', function() {
			var num = 1;
			
			func.async(function() {
				num = 2;
			})();
			
			assert.equal(num ,1);
		});
	});
});