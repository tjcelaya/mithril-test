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
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var spawn = require('child_process').spawn;

var path = {
        main: 'app.js',
        vendorBundle: 'vendor.js',
        vendor: './vendor',
        src: './src',
        dist: './public/dist'
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
    .require(require.resolve('mithril'), { expose: 'm' })
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

gulp.task('build:src', function () {
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

gulp.task('build:css', function () {
    return gulp.src('src/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dist))
        .pipe(livereload());
});

gulp.task('watch', function (){
    livereload.listen();
    gulp.watch([path.src + '/*'], ['clean', 'build:css', 'build:src']);
});

gulp.task('clean', function () {
    del(path.dist + '/' + path.main);
});

gulp.task('server', function (cb) {
    var server = spawn('./server.js');
    server.stdout.on('data', function (data) { console.log(data.toString().trim()); });
    server.stderr.on('data', function (data) { console.error(data.toString().trim()); });
    server.on('error', function(err) { throw err });
    server.on('exit', function (data) { console.log(data.toString().trim()); });
});

gulp.task('default', [
    // 'server',
    'build:vendor',
    'build:css',
    'build:src',
    'watch'
]);
