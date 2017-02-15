'use strict';


const func = require('../../src/func');
const async = require('../../src/async');
const assert = require('chai').assert;


suite('async module', function() {
	test('async is func.async', function () {
		assert.isTrue(async === func.async);
	});
});