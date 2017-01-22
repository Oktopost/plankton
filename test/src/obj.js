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
	
	
	suite('obj.count', () => {
		test('empty object return 0', () => {
			assert.equal(0, obj.count({}));
		});
		
		test('object with keys will returns count', () => {
			assert.equal(2, obj.count({'a': 'b', 2: 3}));
		});
		
		test('prototype keys are not counted', function() {
			var foo = function() {};
			foo.prototype.c = 1;
			
			var a = new foo;
			assert.equal(0, obj.count(a));
			
			a.b = 2;
			assert.equal(1, obj.count(a));
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
	
	suite('obj.forEach', () => {
		test('forEach equals to forEach.values', () => {
			assert.equal(obj.forEach, obj.forEach.value);
		});
		
		
		suite('obj.forEach.value', () => {
			test('empty object', () => {
				let result = [];
				obj.forEach.value({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with values', () => {
				let result = [];
				obj.forEach.value({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([['b'], [{'a': 12}]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				obj.forEach.value({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([['b']], result);
			});
			
			test('object with inherited', () => {
				let result = [];
				let testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.forEach.value(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
		});
		
		suite('obj.forEach.key', () => {
			test('empty object', () => {
				let result = [];
				obj.forEach.key({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with key', () => {
				let result = [];
				obj.forEach.key({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([['a'], ['c']], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				obj.forEach.key({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([['a']], result);
			});
			
			test('object with inherited', () => {
				let result = [];
				let testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.forEach.key(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
		});
		
		suite('obj.forEach.pair', () => {
			test('empty object', () => {
				let result = [];
				obj.forEach.pair({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with key', () => {
				let result = [];
				obj.forEach.pair({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([['a', 'b'], ['c', {'a': 12}]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				obj.forEach.pair({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([['a', 'b']], result);
			});
			
			test('object with inherited', () => {
				let result = [];
				let testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.forEach.pair(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
		});
		
		suite('obj.forEach.item', () => {
			test('empty object', () => {
				let result = [];
				obj.forEach.item({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with key', () => {
				let result = [];
				obj.forEach.item({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([[{'a': 'b'}], [{'c': {'a': 12}}]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				obj.forEach.item({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([[{'a': 'b'}]], result);
			});
			
			test('object with inherited', () => {
				let result = [];
				let testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.forEach.item(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
		});
	});
});