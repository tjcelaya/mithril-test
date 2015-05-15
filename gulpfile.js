'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var del = require('del');
var path = {
        main: 'app.js',
        src: './src',
        srcJs: './src/app.js',
        bin: './bin',
        binJs: './bin/app.js'
    };

gulp.task('build', ['clean'], function () {
    browserify({
        entries: path.srcJs,
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source(path.main))
    .pipe(gulp.dest(path.bin))
    .pipe(livereload({ start: true }));
});


gulp.task('watch', function (){
    livereload.listen();
    gulp.watch([path.src + '/*'], ['build']);
});

gulp.task('clean', function () {
    del(path.dist + '/*');
});

gulp.task('default', ['clean', 'build', 'watch']);