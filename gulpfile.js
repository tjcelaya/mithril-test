'use strict';

var debug = true;
var browserify = require('browserify');
var babelify = require('babelify');
var browserifyShim = require('browserify-shim');
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
        'mithril-bootstrap',
        'mithril'
    ];

function errorHandler (err){
  console.log(err.message);
  this.emit('end');
}

gulp.task('build:vendor', ['clean'], function () {
    var b = browserify({
        require: deps,
        debug: debug
    })
    .require(require.resolve('./node_modules/mithril-bootstrap'), { expose: 'Mithril' })
    .transform(browserifyShim)
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

gulp.task('default', ['build:vendor', 'build:src', 'watch']);
