'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var coffeeify = require('coffeeify');
var browserify = require('browserify');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var del = require('del');
var embedlr = require("gulp-embedlr");
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var path = {
        main: 'app.js',
        mainCoffee: 'app.coffee',
        src: './src',
        srcJs: './src/app.js',
        srcCoffee: './src/app.coffee',
        bin: './bin',
        binJs: './bin/app.js'
    };

gulp.task('build', ['clean'], function () {
    return browserify({
        entries: path.srcJs,
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source(path.main))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    //     .pipe(uglify())
    //     .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.bin))
    .pipe(livereload());
});

gulp.task('brew', function () {
    return browserify({
        entries: path.srcCoffee,
        debug: true
    })
    .transform(coffeeify)
    .bundle()
    .on('error', gutil.log)
    .pipe(source(path.main))
    .pipe(buffer())
    .pipe(gulp.dest(path.bin))
    .pipe(livereload());
});

gulp.task('watchCoffee', function (){
    livereload.listen();
    gulp.watch([path.src + '/*'], ['brew']);
});

gulp.task('clean', function () {
    del(path.dist + '/*');
});

gulp.task('default', ['brew', 'watchCoffee']);