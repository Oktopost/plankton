'use strict';


const obj = require('../../src/obj');
const assert = require('chai').assert;


suite('obj module', function() {
	suite('obj.values', function() {
		
		test('empty object return array', function() {
			assert.isArray(obj.values({}));
		});
		
		test('empty object return empty array', function() {
			assert.equal(0, obj.values({}).length);
		});
		
		test('not empty object return values', function() {
			assert.deepEqual([1, 'b'], obj.values({a: 1, b: 'b'}));
		});
		
		test('object with prototype values does not return prototype values', function() {
			var foo = function() {};
			foo.prototype.c = 1;
			
			var a = new foo;
			a.b = 2;
			
			assert.deepEqual([2], obj.values(a));
		});
	});
});