const url = require('../../index').url;
const assert = require('chai').assert;


suite('url module', () =>
{
	suite('encode', () =>
	{
		test('params not passed, params treated as empty set', () =>
		{
			assert.equal('/a/b', url.encode('/a/b'));
		});
		
		test('empty data, empty string returned', () =>
		{
			assert.equal('', url.encode('', {}));
		});
		
		test('only path, path returned', () =>
		{
			assert.equal('a', url.encode('a', {}));
		});
		
		test('path escaped', () =>
		{
			assert.equal('a%23b', url.encode('a#b', {}));
		});
		
		test('slash at start persisted', () =>
		{
			assert.equal('/a', url.encode('/a', {}));
		});
		
		test('slash at end persisted', () =>
		{
			assert.equal('a/', url.encode('a/', {}));
		});
		
		test('slash persisted', () =>
		{
			assert.equal('a/b', url.encode('a/b', {}));
		});
		
		test('double slash persisted', () =>
		{
			assert.equal('a//b', url.encode('a//b', {}));
		});
		
		test('query param appended', () =>
		{
			assert.equal('a?b=3', url.encode('a', {b: 3}));
		});
		
		test('query param value escaped', () =>
		{
			assert.equal('a?b=a%23b', url.encode('a', {b: 'a#b'}));
		});
		
		test('query param name escaped', () => 
		{
			assert.equal('a?a%23b=a', url.encode('a', {'a#b': 'a'}));
		});
		
		test('path param used only in path', () => 
		{
			assert.equal('a123c', url.encode('a{b}c', {'b': '123'}));
		});
		
		test('path param escaped', () =>
		{
			assert.equal('a%23c', url.encode('a{b}c', {'b': '#'}));
		});
		
		test('path param usend a number of times', () =>
		{
			assert.equal('a1c/1', url.encode('a{b}c/{b}', {'b': '1'}));
		});
		
		test('bool param parsed as int', () =>
		{
			assert.equal('1', url.encode('{b}', {'b': true}));
			assert.equal('0', url.encode('{b}', {'b': false}));
		});
	});
	
	
	suite('decode', () =>
	{
		test('empty string', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: {}}, url.decode(''));
		});
		
		test('path has slash only', () =>
		{
			assert.deepEqual({ uri: '/', path: [], params: {}}, url.decode('/'));
		});
		
		test('path starts with slash', () =>
		{
			assert.deepEqual({ uri: '/abc', path: ['abc'], params: {}}, url.decode('/abc'));
		});
		
		test('path end with slash', () =>
		{
			assert.deepEqual({ uri: 'abc/', path: ['abc'], params: {}}, url.decode('abc/'));
		});
		
		test('path end with #', () =>
		{
			assert.deepEqual({ uri: 'abc', path: ['abc'], params: {}}, url.decode('abc#abc'));
		});
		
		test('path has # in it', () =>
		{
			assert.deepEqual({ uri: 'abc', path: ['abc'], params: {}}, url.decode('abc#abc/def'));
		});
		
		test('long path', () =>
		{
			assert.deepEqual({ uri: '/abc/def', path: [ 'abc', 'def' ], params: {}}, url.decode('/abc/def'));
		});
		
		test('path is decoded', () =>
		{
			assert.deepEqual({ uri: '/a%23b', path: [ 'a#b' ], params: {}}, url.decode('/a%23b'));
		});
		
		test('query params', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { a: 'abc' }}, url.decode('?a=abc'));
		});
		
		test('query params value decoded', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { a: 'ab#c' }}, url.decode('?a=ab%23c'));
		});
		
		test('query params key decoded', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'a#b': 'c' }}, url.decode('?a%23b=c'));
		});
		
		test('query param is empty', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'a': '' }}, url.decode('?a='));
			assert.deepEqual({ uri: '', path: [], params: { 'a': '' }}, url.decode('?a'));
		});
		
		test('query param value has equal sign', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'a': 'b=c' }}, url.decode('?a=b=c'));
		});
		
		test('number of query params', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'a': 'b', 'c': 'd' }}, url.decode('?a=b&c=d'));
		});
		
		test('path with query params', () =>
		{
			assert.deepEqual({ uri: '/a/b', path: ['a', 'b'], params: { 'c': 'd', 'e': 'f' }}, url.decode('/a/b?c=d&e=f'));
		});
		
		test('query params have another ? sign', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'c': 'd?e' }}, url.decode('?c=d?e'));
		});
		
		test('query params have the = sign not attached to any key', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'c': 'd' }}, url.decode('?=&c=d'));
		});
		
		test('query params ends with #', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'c': 'd' }}, url.decode('?c=d#a'));
		});
		
		test('query params has number of #', () =>
		{
			assert.deepEqual({ uri: '', path: [], params: { 'c': 'd' }}, url.decode('?c=d#a&a=4#'));
		});
	});
});