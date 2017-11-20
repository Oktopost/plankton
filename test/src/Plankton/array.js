const array = require('../../index').array;
const assert = require('chai').assert;


suite('array module', function() {
	
	suite('array', function() {
		test('undefined', function() {
			assert.deepEqual([], array());
		});
		
		test('empty array', function() {
			assert.deepEqual([], array([]));
		});
		
		test('already array', function() {
			assert.deepEqual([1, 'abc'], array([1, 'abc']));
		});
		
		test('not array', function() {
			assert.deepEqual(['abc'], array('abc'));
			assert.deepEqual([null], array(null));
			assert.deepEqual([123], array(123));
		});
	});
	
	suite('array.foreach', () => {
		test('foreach equals to foreach.values', () => {
			assert.equal(array.foreach, array.foreach.value);
		});
		
		
		suite('array.foreach.value', () => {
			test('empty array', () => {
				var result = [];
				array.foreach.value([], (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('array with values', () => {
				var result = [];
				array.foreach.value(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([['b'], [{'a': 12}]], result);
			});
			
			test('break aborts loop', () => {
				var result = [];
				array.foreach.value(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([['b']], result);
			});
			
			test('array with missing keys', () => {
				var result = [];
				var data = [1];
				data[100] = 2;
				
				array.foreach.value(data, (...args) => { result.push(args) });
				assert.deepEqual([[1], [2]], result);
			});
			
			test('none index fields skipped', () => {
				var result = [];
				var subject = [];
				
				subject.a = 5;
				
				array.foreach.value(subject, (v) => { result.push(v) });
				assert.deepEqual([], result);
			});
			
			test('passed scope as second param used', () => {
				var scope;
				var item = {};
				
				array.foreach.value([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('array.foreach.key', () => {
			test('empty array', () => {
				var result = [];
				array.foreach.key([], (key, ...args) => { result.push([key, args]) });
				assert.deepEqual([], result);
			});
			
			test('array with key', () => {
				var result = [];
				array.foreach.key(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([[0], [1]], result);
			});
			
			test('break aborts loop', () => {
				var result = [];
				array.foreach.key(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([[0]], result);
			});
			
			test('array with missing keys', () => {
				var result = [];
				var data = [1];
				data[100] = 2;
				
				array.foreach.key(data, (...args) => { result.push(args) });
				assert.deepEqual([[0], [100]], result);
			});
			
			test('passed scope as second parameter used', () => {
				var scope;
				var item = {};
				
				array.foreach.key([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('array.foreach.pair', () => {
			test('empty array', () => {
				var result = [];
				array.foreach.pair({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('array with key', () => {
				var result = [];
				array.foreach.pair(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([[0, 'b'], [1, {'a': 12}]], result);
			});
			
			test('break aborts loop', () => {
				var result = [];
				array.foreach.pair(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([[0, 'b']], result);
			});
			
			test('array with missing keys', () => {
				var result = [];
				var data = [1];
				data[100] = 2;
				
				array.foreach.pair(data, (...args) => { result.push(args) });
				assert.deepEqual([[0, 1], [100, 2]], result);
			});
			
			test('passed scope used', () => {
				var scope;
				var item = {};
				
				array.foreach.pair([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
		
		suite('array.foreach.item', () => {
			test('empty array', () => {
				var result = [];
				array.foreach.item({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('array with key', () => {
				var result = [];
				array.foreach.item(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([[{'0': 'b'}], [{'1': {'a': 12}}]], result);
			});
			
			test('break aborts loop', () => {
				var result = [];
				array.foreach.item(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([[{'0': 'b'}]], result);
			});
			
			test('array with missing keys', () => {
				var result = [];
				var data = [1];
				data[100] = 2;
				
				array.foreach.item(data, (...args) => { result.push(args) });
				assert.deepEqual([[{'0': 1}], [{'100': 2}]], result);
			});
			
			test('passed scope used', () => {
				var scope;
				var item = {};
				
				array.foreach.item([1], item, function () { scope = this; });
				assert.strictEqual(item, scope);
			});
		});
	});
	
	
	suite('array.last', () => {
		
		test('array.last.value is same', () => {
			assert.equal(array.last, array.last.value);
		});
		
		
		suite('array.last.value', () => {
			
			test('Empty array return undefined', () => {
				assert.isUndefined(array.last.value([]));
			});
			
			test('Last value returned', () => {
				assert.equal('a', array.last.value(['a']));
			});
			
			test('Offseted index last value still returned', () => {
				var arr = [];
				arr[400] = 'a';
				arr[500] = 'b';
				
				assert.equal('b', array.last.value(arr));
			});
		});
		
		
		suite('array.last.key', () => {
			
			test('Empty array return undefined', () => {
				assert.isUndefined(array.last.key([]));
			});
			
			test('Last key returned', () => {
				assert.equal(0, array.last.key(['a']));
			});
			
			test('Offseted index last value still returned', () => {
				var arr = [];
				arr[400] = 'a';
				arr[500] = 'b';
				
				assert.equal(500, array.last.key(arr));
			});
		});
	});
	
	suite('array.first', () => {
		
		test('array.first.value is same', () => {
			assert.equal(array.first, array.first.value);
		});
		
		
		suite('array.first.value', () => {
			
			test('empty array return undefined', () => {
				assert.isUndefined(array.first.value([]));
			});
			
			test('first value returned', () => {
				assert.equal('a', array.first.value(['a']));
			});
			
			test('offseted index first value still returned', () => {
				var arr = [];
				arr[400] = 'a';
				arr[500] = 'b';
				
				assert.equal('a', array.first.value(arr));
			});
		});
		
		
		suite('array.first.key', () => {
			
			test('empty array return undefined', () => {
				assert.isUndefined(array.first.key([]));
			});
			
			test('first key returned', () => {
				assert.equal(0, array.first.key(['a']));
			});
			
			test('offseted index first value still returned', () => {
				var arr = [];
				arr[400] = 'a';
				arr[500] = 'b';
				
				assert.equal(400, array.first.key(arr));
			});
		});
	});
	
	
	suite('array.count', () => {
		
		test('empty array', () => {
			assert.equal(0, array.count([]));
		});
		
		test('valid array', () => {
			assert.equal(2, array.count(['a', 'b']));
		});
		
		test('array with offset values', () => {
			var arr = [];
			arr[400] = 'a';
			arr[500] = 'b';
			
			assert.equal(2, array.count(arr));
		});
	});
	
	
	suite('array.isNormalized', () => {
		
		test('empty array', () => {
			assert.isTrue(array.isNormalized([]));
		});
		
		test('valid array', () => {
			assert.isTrue(array.isNormalized(['a', 'b']));
		});
		
		test('array with offset values', () => {
			var arr = [];
			
			arr[400] = 'a';
			arr[500] = 'b';
			
			assert.isFalse(array.isNormalized(arr));
		});
	});
	
	
	suite('array.normalize', () => {
		
		test('empty array', () => {
			assert.deepEqual([], array.normalize([]));
		});
		
		test('valid array', () => {
			assert.deepEqual(['a', 'b'], array.normalize(['a', 'b']));
		});
		
		test('array with offset values', () => {
			var arr = [];
			
			arr[400] = 'a';
			arr[500] = 'b';
			
			assert.deepEqual(['a', 'b'], array.normalize(arr));
		});
		
		test('original array not modified', () => {
			var arr = [];
			var original = [];
			
			arr[10] = 'a';
			arr[12] = 'b';
			original[10] = 'a';
			original[12] = 'b';
			
			array.normalize(arr)
			
			assert.deepEqual(original, arr);
		});
	});
	
	suite('array.unique', () => {
		test('empty array', () => {
			assert.deepEqual([], array.unique([]));
		});
		
		test('original array not modified', () => {
			var arr = [1,2,2,3,3,4,5,6,6,7];
		
			array.unique(arr);
			
			assert.deepEqual([1,2,2,3,3,4,5,6,6,7], arr);
		});
	
		test('preserve order', () => {
			var arr = [2,3,3,1,1,2];
			
			assert.deepEqual([2,3,1], array.unique(arr));
		})
	
		suite('sanity', () => {
			test('unique numbers', () => {
				var arr = [1,2,2,3,3,4,5,6,6,7];
		
				assert.deepEqual([1,2,3,4,5,6,7], array.unique(arr));
			});
	
			test('unique strings', () => {
				var arr = ['a', 'a', 'b', 'c', 'd', 'e', 'e', 'e', 'f'];
	
				assert.deepEqual(['a','b','c','d','e','f'], array.unique(arr));
			});
		});
	});
});