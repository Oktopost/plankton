const is = require('../../index').is;
const obj = require('../../index').obj;
const assert = require('chai').assert;


suite('obj module', function() {
	
	suite('obj.copy', function() {
		test('empty object', () => {
			assert.deepEqual({}, obj.copy({}));
		});
		
		test('same data returned', () => {
			var subject = {a: 1, b: 2};
			var res = obj.copy(subject);
			
			assert.deepEqual(res, subject);
		});
		
		test('new object returned', () => {
			var subject = {a: 1, b: 2};
			var res = obj.copy(subject);
			
			assert.isFalse(res === subject);
		});
	});
	
	suite('obj.mix', function() {
		test('empty object', () => {
			assert.deepEqual({}, obj.mix({}));
		});
		
		test('empty mixed objects', () => {
			assert.deepEqual({ a: 1 }, obj.mix({ a: 1 }, {}, {}));
		});
		
		test('objects mixed in', () => {
			assert.deepEqual({ a: 1, b: 2, c: 3 }, obj.mix({ a: 1 }, { b: 2 }, { c: 3 }));
		});
		
		test('newer objects override', () => {
			assert.deepEqual({ a: 3 }, obj.mix({ a: 1 }, { a: 2 }, { a: 3 }));
		});
		
		test('original object is modified', () => {
			var subject = { a: 1 };
			obj.mix(subject, { b: 2 });
			assert.deepEqual({ a: 1, b: 2 }, subject);
		});
		
		test('original object is returned', () => {
			var subject = { a: 1 };
			assert.isTrue(subject === obj.mix(subject, { b: 2 }));
		});
		
		test('other objects are not modified', () => {
			var subject = { a: 1 };
			var b = { b: 2 };
			var c = { c: 3 };
			
			obj.mix(subject, b, c);
			
			assert.deepEqual({ b: 2 }, b);
			assert.deepEqual({ c: 3 }, c);
		});
	});
	
	suite('obj.merge', function() {
		test('no data passed', () => {
			assert.deepEqual({}, obj.merge());
		});
		
		test('empty object', () => {
			assert.deepEqual({}, obj.merge({}));
		});
		
		test('empty objects merge', () => {
			assert.deepEqual({}, obj.merge({}, {}, {}));
		});
		
		test('objects merge', () => {
			assert.deepEqual({ a: 1, b: 2, c: 3 }, obj.merge({ a: 1 }, { b: 2 }, { c: 3 }));
		});
		
		test('newer values override', () => {
			assert.deepEqual({ a: 3 }, obj.merge({ a: 1 }, { a: 2 }, { a: 3 }));
		});
		
		test('other objects are not modified', () => {
			var a = { a: 1 };
			var b = { b: 2 };
			var c = { c: 3 };
			
			obj.merge(a, b, c);
			
			assert.deepEqual({ a: 1 }, a);
			assert.deepEqual({ b: 2 }, b);
			assert.deepEqual({ c: 3 }, c);
		});
	});
	
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
		
		test('key with undefined value', () => {
			assert.deepEqual(['k'], obj.keys({'k': undefined}));
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
		
		test('undefined value counted', () => {
			assert.deepEqual(1, obj.count({'k': undefined}));
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
		test('obj.any equals obj.any.value', () => {
			assert.equal(obj.any, obj.any.value);
		});
		
		
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
			
			test('object with undefined value returns undefined', () => {
				assert.equal(undefined, obj.any.value({'c': undefined}));
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
			
			test('object with undefined value returns key', () => {
				assert.equal('c', obj.any.key({'c': undefined}));
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
			
			test('object with undefined value returns item', () => {
				assert.deepEqual({'c': undefined}, obj.any.item({'c': undefined}));
			});
		});
	});
	
	suite('obj.foreach', () =>
	{
		test('foreach equals to foreach.values', () =>
		{
			assert.equal(obj.foreach, obj.foreach.value);
		});
		
		
		suite('obj.foreach.value', () =>
		{
			test('empty object', () =>
			{
				var result = [];
				obj.foreach.value({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with undefined value', () =>
			{
				var result = [];
				obj.foreach.value({k: undefined}, (...args) => { result.push(args) });
				assert.deepEqual([[undefined]], result);
			});
			
			test('object with values', () =>
			{
				var result = [];
				obj.foreach.value({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([['b'], [{'a': 12}]], result);
			});
			
			test('break aborts loop', () =>
			{
				var result = [];
				obj.foreach.value({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([['b']], result);
			});
			
			test('object with inherited', () =>
			{
				var result = [];
				var testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.foreach.value(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.foreach.value([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('obj.foreach.key', () => 
		{
			test('empty object', () =>
			{
				var result = [];
				obj.foreach.key({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with undefined value', () =>
			{
				var result = [];
				obj.foreach.key({k: undefined}, (...args) => { result.push(args) });
				assert.deepEqual([['k']], result);
			});
			
			test('object with key', () =>
			{
				var result = [];
				obj.foreach.key({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([['a'], ['c']], result);
			});
			
			test('break aborts loop', () =>
			{
				var result = [];
				obj.foreach.key({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([['a']], result);
			});
			
			test('object with inherited', () =>
			{
				var result = [];
				var testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.foreach.key(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.foreach.key([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('obj.foreach.pair', () =>
		{
			test('empty object', () =>
			{
				var result = [];
				obj.foreach.pair({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with key', () =>
			{
				var result = [];
				obj.foreach.pair({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([['a', 'b'], ['c', {'a': 12}]], result);
			});
			
			test('break aborts loop', () =>
			{
				var result = [];
				obj.foreach.pair({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([['a', 'b']], result);
			});
			
			test('object with undefined value', () =>
			{
				var result = [];
				obj.foreach.pair({k: undefined}, (...args) => { result.push(args) });
				assert.deepEqual([['k', undefined]], result);
			});
			
			test('object with inherited', () =>
			{
				var result = [];
				var testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.foreach.pair(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.foreach.pair([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('obj.foreach.item', () =>
		{
			test('empty object', () =>
			{
				var result = [];
				obj.foreach.item({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('object with key', () =>
			{
				var result = [];
				obj.foreach.item({'a': 'b', 'c': {'a': 12}}, (...args) => { result.push(args) });
				assert.deepEqual([[{'a': 'b'}], [{'c': {'a': 12}}]], result);
			});
			
			test('object with undefined value', () =>
			{
				var result = [];
				obj.foreach.item({k: undefined}, (...args) => { result.push(args) });
				assert.deepEqual([[{'k': undefined}]], result);
			});
			
			test('break aborts loop', () =>
			{
				var result = [];
				obj.foreach.item({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); return false });
				assert.deepEqual([[{'a': 'b'}]], result);
			});
			
			test('object with inherited', () =>
			{
				var result = [];
				var testClass = function() {};
				testClass.prototype.a = 12;
				
				obj.foreach.item(new testClass, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.foreach.item([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
	});
	
	suite('obj.filter', () =>
	{
		test('obj.filter.value same as obj.filter', () =>
		{
			assert.equal(obj.filter, obj.filter.value);
		});
		
		
		suite('obj.filter.value', () =>
		{
			test('value passed to callback', () =>
			{
				var result = [];
				obj.filter.value({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); });
				assert.deepEqual([['b'], ['d']], result);
			});
			
			test('only filtered items returned', () =>
			{
				var res = obj.filter.value({'a': 1, 'c': 2, 'e': 3, 'f': 4}, (num) => { return num % 2 === 0; });
				assert.deepEqual({'c': 2, 'f': 4}, res);
			});
			
			test('returned null will abort', () => 
			{
				var res = obj.filter.value(
					{'a': 1, 'c': 2, 'e': 3, 'f': 4}, 
					(num) => { 
						if (num === 3) return null;
						
						return num % 2 === 0; 
					}
				);
				
				assert.deepEqual({'c': 2}, res);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.filter.value([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('obj.filter.key', () =>
		{
			test('key passed to callback', () =>
			{
				var result = [];
				obj.filter.key({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); });
				assert.deepEqual([['a'], ['c']], result);
			});
			
			test('only filtered items returned', () =>
			{
				var res = obj.filter.key(
					{'a': 1, 'c': 2, 'e': 3, 'f': 4}, 
					(num) => { return num === 'c' || num === 'f'; }
				);
				
				assert.deepEqual({'c': 2, 'f': 4}, res);
			});
			
			test('returned null will abort', () =>
			{
				var res = obj.filter.key(
					{'a': 1, 'c': 2, 'e': 3, 'f': 4}, 
					(k) => { 
						if (k === 'e') return null;
						
						return k === 'c' || k === 'f';
					}
				);
				
				assert.deepEqual({'c': 2}, res);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.filter.key([1], item, function () { scope = this; });
				assert.equal(item, scope);
			});
		});
		
		suite('obj.filter.pair', () =>
		{
			test('obj.filter.pair pair passed to callback', () => 
			{
				var result = [];
				obj.filter.pair({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); });
				assert.deepEqual([['a', 'b'], ['c', 'd']], result);
			});
			
			test('only filtered items returned', () =>
			{
				var res = obj.filter.pair({'a': 1, 'c': 2, 'e': 3, 'f': 4}, (k, num) => { return num % 2 === 0; });
				assert.deepEqual({'c': 2, 'f': 4}, res);
			});
			
			test('returned null will abort', () =>
			{
				var res = obj.filter.pair(
					{'a': 1, 'c': 2, 'e': 3, 'f': 4}, 
					(k, num) => { 
						if (num === 3) return null;
						
						return num % 2 === 0; 
					}
				);
				
				assert.deepEqual({'c': 2}, res);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.filter.pair([1], item, function () { scope = this; });
				assert.equal(item, scope);
			});
		});
		
		suite('obj.filter.item', () =>
		{
			test('item passed to callback', () =>
			{
				var result = [];
				obj.filter.item({'a': 'b', 'c': 'd'}, (...args) => { result.push(args); });
				assert.deepEqual([[{'a': 'b'}], [{'c': 'd'}]], result);
			});
			
			test('only filtered items returned', () =>
			{
				var res = obj.filter.item(
					{'a': 1, 'c': 2, 'e': 3, 'f': 4}, 
					(data) => { return is(data['c']) || is(data['f']); }
				);
				
				assert.deepEqual({'c': 2, 'f': 4}, res);
			});
			
			test('returned null will abort', () =>
			{
				var res = obj.filter.item(
					{'a': 1, 'c': 2, 'e': 3, 'f': 4}, 
					(data) => { 
						if (is(data['e'])) return null;
						
						return is(data['c']) || is(data['f']);
					}
				);
				
				assert.deepEqual({'c': 2}, res);
			});
			
			test('passed scope used', () =>
			{
				var scope;
				var item = {};
				
				obj.filter.item([1], item, function () { scope = this; });
				assert.equal(item, scope);
			});
		});
	});

	suite('obj.path', function()
	{
		test('no data passed', () =>
		{
			assert.equal(undefined, obj.path());
		});

		test('empty object', () =>
		{
			assert.equal(undefined, obj.path({}));
		});

		test('empty path', () =>
		{
			assert.equal(undefined, obj.path({a: 1}, []));
			assert.equal(undefined, obj.path({a: 1}, ''));
		});

		test('path defined', () =>
		{
			assert.deepEqual([1], obj.path({ a: { b: [1] } }, ['a', 'b']));
			assert.deepEqual({ c: 1 }, obj.path({ a: { b: { c: 1 } } }, 'a.b'));
			assert.equal(1, obj.path({ a: { b: 1 } }, ['a', 'b']));
			assert.equal(null, obj.path({ a: { b: null } }, 'a.b'));
			assert.equal('', obj.path({ a: { b: '' } }, ['a', 'b']));
			assert.equal(false, obj.path({ a: { b: false } }, 'a.b'));
		});

		test('path not defined', () =>
		{
			assert.deepEqual([1], obj.path({ a: { c: 1 } }, ['a', 'b'], [1]));
			assert.deepEqual({ c: 1 }, obj.path({ a: { c: 1 } }, 'a.b', { c: 1 }));
			assert.equal(1, obj.path({ a: { c: 1 } }, ['a', 'b'], 1));
			assert.equal(null, obj.path({ a: { c: 1 } }, 'a.b'), null);
			assert.equal('', obj.path({ a: { c: 1 } }, ['a', 'b'], ''));
			assert.equal(false, obj.path({ a: { c: 1 } }, 'a.b', false));
			assert.equal(undefined, obj.path({ a: { c: 1 } }, 'a.b'));
		});
	});
});