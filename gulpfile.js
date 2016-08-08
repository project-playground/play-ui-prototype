var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var argv = require('yargs').argv;

var src = 'public/src';
var lib = 'public/lib';
var dist = 'public/dist';
var build_target = '/var/apps/ui-proto/public';

var paths = {
	js: src + '/js/*.js',
	css: src + '/css/*.css',
	html: src + '/**/*.html',
	all_lib: lib + '/**/*'
};

// 웹서버를 localhost:8000로 실행
gulp.task('server', function() {
	var config = {
		port: (argv.port === undefined) ? 8000 : argv.port
	};

	return gulp.src(dist + '/')
		.pipe(webserver(config));
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function() {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// CSS 파일을 배포한다
gulp.task('combine-css', function() {
	return gulp.src(paths.css)
		.pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function() {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

// Lib 파일을 배포한다.
gulp.task('combine-lib', function() {
	return gulp.src(paths.all_lib)
		.pipe(gulp.dest(dist + '/lib'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(paths.js, ['combine-js']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(paths.all_lib, ['combine-lib']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

gulp.task('build-dist', function() {
	return gulp.src(dist + '/**/*')
		.pipe(gulp.dest(build_target + '/'));
});

gulp.task('default', ['server', 'combine-js', 'combine-css', 'compress-html', 'combine-lib', 'watch']);

gulp.task('build', ['combine-js', 'combine-css', 'compress-html', 'combine-lib', 'build-dist']);
