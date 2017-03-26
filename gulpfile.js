'use strict';


const gulp = require('gulp');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const wrap = require("gulp-wrap");
const replace = require('gulp-string-replace');


gulp.task('test', () => {
	console.log('Gulp works!');
});


gulp.task('clean-web', () => {
	return gulp.src('./bin/*')
		.pipe(clean());
});

gulp.task('prepare-web', ['clean-web'], () => {
	return gulp.src([
			'./src/is.js',
			'./src/array.js',
			'./src/obj.js',
			'./src/func.js',
			'./src/as.js'
		])
	
		.pipe(replace(/module\.exports = is;/, 'module\.exports = {is: is};'))
		.pipe(replace(/module\.exports = as;/, 'module\.exports = {as: as};'))
		.pipe(replace(/module\.exports = obj;/, 'module\.exports = {obj: obj};'))
		.pipe(replace(/module\.exports = func;/, 'module\.exports = {func: func};'))
		.pipe(replace(/module\.exports = array;/, 'module\.exports = {array: array};'))
	
		.pipe(replace(/require\('\.\/is'\)/, 'plankton.is'))
		.pipe(replace(/require\('\.\/as'\)/, 'plankton.as'))
		.pipe(replace(/require\('\.\/obj'\)/, 'plankton.obj'))
		.pipe(replace(/require\('\.\/func'\)/, 'plankton.func'))
		.pipe(replace(/require\('\.\/array'\)/, 'plankton.array'))
		
		.pipe(wrap({src: './gulp/web/web-mixin.js.template'}))
		.pipe(gulp.dest('./bin/tmp'));
});


gulp.task('build-web', ['clean-web', 'prepare-web'], () => {
	return gulp.src([
			'./gulp/web/web-prefix.js',
			'./bin/tmp/is.js',
			'./bin/tmp/array.js',
			'./bin/tmp/obj.js',
			'./bin/tmp/func.js',
			'./bin/tmp/as.js'
		])
		.pipe(concat('plankton.js'))
		.pipe(gulp.dest('./'))
		.pipe(minify())
		.pipe(gulp.dest('./'));
});