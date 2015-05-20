'use strict';

var debug = true;
var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var embedlr = require("gulp-embedlr");
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');

var path = {
        main: 'app.js',
        vendorBundle: 'vendor.js',
        vendor: './vendor',
        src: './src',
        dist: './dist'
    };

var deps = [
        'mithril',
        'mithril.sugartags'
    ];

function errorHandler (err){
  console.log(err.message);
  this.emit('end');
}

function uglifyWithSourceMaps (stream) {
    
}

gulp.task('build:vendor', ['clean'], function () {
    var b = browserify({
        require: deps,
        debug: debug
    })
    .bundle()
    .on('error', errorHandler)
    .pipe(source(path.vendorBundle))
    .pipe(buffer());

    if (!debug)
        b.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'));

    b.pipe(gulp.dest(path.dist));
});

gulp.task('build:src', ['clean'], function () {
    var b = browserify({
        entries: path.src + '/' + path.main,
        debug: debug
    })
    .external(deps)
    .transform(babelify)
    .bundle()
    .on('error', errorHandler)
    .pipe(source(path.main))
    .pipe(buffer());

    if (!debug)
        b.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'));

    b.pipe(gulp.dest(path.dist))
    .pipe(livereload());
});

gulp.task('watch', function (){
    livereload.listen();
    gulp.watch([path.src + '/*'], ['build:src']);
});

gulp.task('clean', function () {
    del(path.dist + '/' + path.main);
});

gulp.task('default', ['build:src', 'watch']);