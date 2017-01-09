'use strict';


const gulp = require('gulp');
const clean = require('gulp-clean');
const deleteLines = require('gulp-delete-lines');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const wrap = require("gulp-wrap");
const replace = require('gulp-string-replace');
const merge = require('merge-stream');


gulp.task('test', () => {
	console.log('Gulp works!');
});


gulp.task('clean-web', () => {
	return gulp.src('./bin/*')
		.pipe(clean());
});

gulp.task('prepare-web', ['clean-web'], () => {
	return gulp.src('./src/*.js')
		.pipe(deleteLines({
			'filters': [
				"'use strict';"
			]
		}))
		.pipe(replace(/require\('\.\/is'\)/, 'plankton.is'))
		.pipe(wrap({src: './gulp/web/web-mixin.js.template'}))
		.pipe(gulp.dest('./bin/tmp'));
});


gulp.task('build-web', ['clean-web', 'prepare-web'], () => {
	return gulp.src([
			'./gulp/web/web-prefix.js',
			'./bin/tmp/*.js'
		])
		.pipe(concat('plankton.js'))
		.pipe(gulp.dest('./bin'))
		.pipe(minify())
		.pipe(gulp.dest('./bin'));
});