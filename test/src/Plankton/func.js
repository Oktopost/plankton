const func = require('../../../index').func;
const assert = require('chai').assert;
const common = require('./common');


suite('func module', function()
{
	suite('func', function()
	{
		test('subject is function', function()
		{
			let f = function() {}; 
			
			assert.equal(func(f), f);
		});
		
		test('subject is undefined', function()
		{
			assert.instanceOf(func(), Function);
			assert.equal((func())(), undefined);
		});
		
		test('subject is not a function', function()
		{
			assert.instanceOf(func(0), Function);
			assert.equal(func('asbasd')(), 'asbasd');
		});
	});
	
	suite('func.returns', () =>  
	{
		function assertFuncReturns(name, expectedValue)
		{
			var argsPassed = false;
			var subject = func.returns[name](function(...a) { argsPassed = a; });
			
			assert.equal(subject(1, 'a', false), expectedValue);
			assert.deepEqual(argsPassed, [1, 'a', false]);
		}
		
		
		test('Set value returned', () => 
		{
			var subject = func.returns(1, function() {});
			assert.equal(subject(), 1);
		});
		
		test('Original function invoked', () => 
		{
			var isCalled = false;
			var subject = func.returns(1, function() { isCalled = true; });
			
			subject();
			
			assert.equal(isCalled, true);
		});
		
		test('Arguments passed', () => 
		{
			var argsPassed = false;
			var subject = func.returns(1, function(...a) { argsPassed = a; });
			
			subject(1, 'a', false);
			
			assert.deepEqual(argsPassed, [1, 'a', false]);
		});
		
		test ('false, true variations', () => 
		{
			assertFuncReturns('true', true);
			assertFuncReturns('false', false);
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
			
			var testFunc = func.async(
				function()
				{
					num = 2;
				});
			
			testFunc();
			
			assert.equal(num ,1);
		});
		
		
		suite('func.async.do', function() {
			test('promise returned', function() {
				assert.instanceOf(func.async.do(function() {}), Promise);
			});
			
			test('function invoked', function() {
				var testMethod = function(resolve) 
					{
						var called = false;
						func.async.do(function() { called = true; });
						
						setTimeout(
							() =>
							{  
								assert.equal(called, true);
								resolve();
							}, 
							1);
					};
				
				return new Promise(testMethod);
			});
		})
	});
	
	suite('func.safe', function() {
		test('valid function', function() {
			var called = false;
			
			var f = func.safe(
				function()
				{
					called = true;
				});
			
			f();
			assert.isTrue(called);
		});
		
		test('valid function error handle ot called', function() {
			var called = false;
			
			var f = func.safe(
				function() { called = true; },
				function() { assert.fail();	}
			);
			
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
			
			var f = func.silent(function() { called = true; });
			
			f();
			assert.isTrue(called);
		});
		
		test('valid silent error ignored', function() {
			var f = func.silent(function() { throw ignored; });
			
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
			var f = func.postponed(function() { return 5; }, 0);
			
			assert.instanceOf(f(), Promise);
		});
		
		test('function called', function() {
			var called = false;
			var f = func.postponed(function() { called = true; }, 0);
			
			return f().then(() => { assert.isTrue(called); });
		});
		
		test('arguments passed', function() {
			var called = false;
			var f = func.postponed(
				function(a, b)
				{
					assert.equal(a, 1);
					assert.equal(b, '2');
				},
				0);
			
			return f(1, '2');
		});
		
		test('call postponed', function() {
			var delay = 10;
			var called = false;
			var start = (new Date()).getTime();
			var f = func.postponed(
				function()
				{
					return called = (new Date()).getTime();
				},
				delay);
			
			return f().then(
				(called) => 
				{
					assert.isTrue(start + delay <= called);
				});
		});
	});
});