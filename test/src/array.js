'use strict';


const array = require('../../src/array');
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
	
	suite('array.forEach', () => {
		test('forEach equals to forEach.values', () => {
			assert.equal(array.forEach, array.forEach.value);
		});
		
		
		suite('array.forEach.value', () => {
			test('empty array', () => {
				let result = [];
				array.forEach.value([], (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('array with values', () => {
				let result = [];
				array.forEach.value(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([['b'], [{'a': 12}]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				array.forEach.value(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([['b']], result);
			});
			
			test('array with missing keys', () => {
				let result = [];
				let data = [1];
				data[100] = 2;
				
				array.forEach.value(data, (...args) => { result.push(args) });
				assert.deepEqual([[1], [2]], result);
			});
		});
		
		suite('array.forEach.key', () => {
			test('empty array', () => {
				let result = [];
				array.forEach.key([], (key, ...args) => { result.push([key, args]) });
				assert.deepEqual([], result);
			});
			
			test('array with key', () => {
				var is = require('../../src/is');
				let result = [];
				array.forEach.key(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([[0], [1]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				array.forEach.key(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([[0]], result);
			});
			
			test('array with missing keys', () => {
				let result = [];
				let data = [1];
				data[100] = 2;
				
				array.forEach.key(data, (...args) => { result.push(args) });
				assert.deepEqual([[0], [100]], result);
			});
		});
		
		suite('array.forEach.pair', () => {
			test('empty array', () => {
				let result = [];
				array.forEach.pair({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('array with key', () => {
				let result = [];
				array.forEach.pair(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([[0, 'b'], [1, {'a': 12}]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				array.forEach.pair(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([[0, 'b']], result);
			});
			
			test('array with missing keys', () => {
				let result = [];
				let data = [1];
				data[100] = 2;
				
				array.forEach.pair(data, (...args) => { result.push(args) });
				assert.deepEqual([[0, 1], [100, 2]], result);
			});
		});
		
		suite('array.forEach.item', () => {
			test('empty array', () => {
				let result = [];
				array.forEach.item({}, (...args) => { result.push(args) });
				assert.deepEqual([], result);
			});
			
			test('array with key', () => {
				let result = [];
				array.forEach.item(['b', {'a': 12}], (...args) => { result.push(args) });
				assert.deepEqual([[{'0': 'b'}], [{'1': {'a': 12}}]], result);
			});
			
			test('break aborts loop', () => {
				let result = [];
				array.forEach.item(['b', 'd'], (...args) => { result.push(args); return false });
				assert.deepEqual([[{'0': 'b'}]], result);
			});
			
			test('array with missing keys', () => {
				let result = [];
				let data = [1];
				data[100] = 2;
				
				array.forEach.item(data, (...args) => { result.push(args) });
				assert.deepEqual([[{'0': 1}], [{'100': 2}]], result);
			});
		});
		
	});
});