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
	
	suite('func.safe', function() {
		test('valid function', function() {
			var called = false;
			
			var f = func.safe(function() {
				called = true;
			});
			
			f();
			assert.isTrue(called);
		});
		
		test('valid function error handle ot called', function() {
			var called = false;
			
			var f = func.safe(
				function() { called = true; },
				function() { assert.fail();	});
			
			f();
			assert.isTrue(called);
		});
		
		test('valid function error thrown, error handle called', function() {
			var error = 'abc';
			
			var f = func.safe(
				function() { throw error; },
				function(err) { assert.equal(err, error);	});
			
			f();
		});
		
		test('valid function error thrown no error handle set', function() {
			var error = 'abc';
			var f = func.safe(function() { throw error; });
			f();
		});
	});
	
	suite('func.silent', function() {
		test('valid function', function() {
			var called = false;
			
			var f = func.silent(function() {
				called = true;
			});
			
			f();
			assert.isTrue(called);
		});
		
		test('valid silent error ignored', function() {
			var f = func.silent(function() {  throw ignored; });
			
			f();
		});
	});
	
	suite('func.cached', function() {
		test('function called first time', function() {
			var calls = 0;
			var f = func.cached(function() { calls++; });
			
			f();
			assert.equal(1, calls);
		});
		
		test('function not called second time', function() {
			var calls = 0;
			var f = func.cached(function() { calls++; });
			
			f();
			f();
			assert.equal(1, calls);
		});
		
		test('function returns result', function() {
			var f = func.cached(function() { return 2; });
			assert.equal(2, f());
		});
		
		test('function returns same result each time', function() {
			var f = func.cached(function() { return 2; });
			assert.equal(2, f());
			assert.equal(2, f());
		});
	});
	
	suite('func.postponed', function() {
		test('promise returned', function() {
			var f = func.postponed(function() {
				return 5;
			}, 0);
			
			assert.instanceOf(f(), Promise);
		});
		
		test('function called', function() {
			var called = false;
			var f = func.postponed(function() {
				called = true;
			}, 0);
			
			return f().then(() => { assert.isTrue(called); });
		});
		
		test('arguments passed', function() {
			var called = false;
			var f = func.postponed(function(a, b) {
				 assert.equal(a, 1);
				 assert.equal(b, '2');
			}, 0);
			
			return f(1, '2');
		});
		
		test('call postponed', function() {
			var delay = 10;
			var called = false;
			var start = (new Date()).getTime();
			var f = func.postponed(function() {
				 return called = (new Date()).getTime();
			}, delay);
			
			return f().then((called) => {
				assert.isTrue(start + delay <= called);
			});
		});
	});
	
	suite('func.interval', function() {
		test('interval', function() {
			var i = 0;
			var f = new Promise(function (resolve) {
					func.interval(function () {
						i = 1;
						resolve(i);
					}, 1, 1);
					
				});

			return f.then(function(called){
				assert.equal(i, 1);
			});
		});
	});
});