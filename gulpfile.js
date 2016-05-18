var gulp = require('gulp'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	replace = require('gulp-replace'),
	rename = require('gulp-rename'),
	util = require('gulp-util'),
	uglify = require('gulp-uglify');

var fs = require('fs')
var path = require('path')

var currentDir = __dirname

function compileLess(compress) {
	var stream = gulp.src("src/style/*.less").pipe(less())

	if (compress) {
		stream = stream.pipe(cssmin()).pipe(rename({
			suffix: ".min"
		}))
	}
	return stream.pipe(gulp.dest("asset/css"))
}


function compileJs(compress) {
	var stream = gulp.src("src/js/*.js");

	if (compress) {
		stream = stream.pipe(uglify()).pipe(rename({
			suffix: ".min"
		}))
	}
return stream.pipe(gulp.dest("asset/js"))
}

gulp.task("js:development", function() {
	return compileJs(false)
})

gulp.task("js", function() {
	return compileJs(true)
})

gulp.task("build:development", ["less:development", "js:development"])

gulp.task("build", ["less", "js"])