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
	
	
	suite('obj.keys', () => {
		test('empty object return array', () => {
			assert.isArray(obj.keys({}));
		});
		
		test('empty object empty keys', () => {
			assert.deepEqual([], obj.keys({}));
		});
		
		test('object with keys will return keys', () => {
			assert.deepEqual(['a', '2'].sort(), obj.keys({'a': 'b', 2: 3}).sort());
		});
		
		test('object with prototype values does not return prototype values', function() {
			var foo = function() {};
			foo.prototype.c = 1;
			
			var a = new foo;
			a.b = 2;
			
			assert.deepEqual(['b'], obj.keys(a));
		});
	});
	
	
	suite('obj.any', () => {
		suite('obj.any.value', () => {
			test('empty object return undefined', () => {
				assert.isUndefined(obj.any.value({}));
			});
			
			test('object with one key return a value', () => {
				assert.equal(1, obj.any.value({'a': 1}));
			});
			
			test('object with keys return a value', () => {
				assert.include(['a', 2], obj.any.value({'c': 2, 'b': 'a'}));
			});
		});
		
		suite('obj.any.key', () => {
			test('empty object return undefined', () => {
				assert.isUndefined(obj.any.key({}));
			});
			
			test('object with one key return a key', () => {
				assert.equal('a', obj.any.key({'a': 1}));
			});
			
			test('object with keys return a key', () => {
				assert.include(['a', 'b'], obj.any.key({'a': 2, 'b': 'c'}));
			});
		});
		
		suite('obj.any.item', () => {
			test('empty object return undefined', () => {
				assert.isUndefined(obj.any.item({}));
			});
			
			test('object with element, element returned', () => {
				assert.deepEqual({'a': 1}, obj.any.item({'a': 1}));
			});
			
			test('object with number of items', () => {
				assert.include([{'a': 2}, {'b': 'c'}], obj.any.item({'a': 2, 'b': 'c'}));
			});
		});
	});
});