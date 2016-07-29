'use strict';

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del'),
	browserSync = require('browser-sync'),
	resolveDependencies = require('gulp-resolve-dependencies'),
	concat = require('gulp-concat'),
	foreach = require('gulp-foreach'),
	path = require('path');

// JS

gulp.task('js', function() {
	return gulp.src('app/js/**/*')
		.pipe(foreach(function(stream, file) {
			return stream
				.pipe(resolveDependencies({
					pattern: /\* @requires [\s-]*(.*\.js)/g
				}))
				.pipe(concat(path.basename(file.path)));
		}))
		.pipe(gulp.dest('dist/js'));
		//.pipe(rename({ suffix: '.min' }))
		//.pipe(uglify())
		//.pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], browserSync.reload);

// CLEAN DIST / BUILD DIST

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('deploy', ['clean'], function() {
	gulp.start('js');
});

// WATCH SOURCE CHANGES

gulp.task('watch', function() {
	gulp.watch('app/js/**/*', ['js-watch']);
});

// SERVER

gulp.task('server', ['deploy'], function() {
	browserSync({ server: { baseDir: 'dist' } });
	gulp.start('watch');
});
