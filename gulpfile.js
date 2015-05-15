'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var del = require('del');
var embedlr = require("gulp-embedlr");
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


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
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.bin))
    .pipe(livereload());
});


gulp.task('watch', function (){

    gulp.src("./src/index.html")
        .pipe(embedlr())
        .pipe(gulp.dest("."));
    livereload.listen();
    gulp.watch([path.src + '/*'], ['build']);
});

gulp.task('clean', function () {
    del(path.dist + '/*');
});

gulp.task('default', ['clean', 'build', 'watch']);