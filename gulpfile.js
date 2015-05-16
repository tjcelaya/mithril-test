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
        src: './src/',
        srcJs: './src/app.js',
        srcCoffee: './src/app.coffee',
        dist: './dist',
        distJs: './dist/app.js'
    };

gulp.task('build', ['clean'], function () {
    return browserify({
        entries: path.srcJs,
        debug: true
    })
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source(path.main))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    //     .pipe(uglify())
    //     .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist))
    .pipe(livereload());
});

gulp.task('watch', function (){
            livereload.listen();
    gulp.watch([path.src + '/*'], ['build']);
});

gulp.task('brew', ['clean'], function () {
    return browserify({
        entries: path.srcCoffee,
        extensions: ['.coffee'],
        debug: true
    })
    .transform(coffeeify)
    .bundle()
    .on('error', function(err){
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source(path.main))
    .pipe(buffer())
    .pipe(gulp.dest(path.dist))
    .pipe(livereload());
});

gulp.task('watchCoffee', function (){
    livereload.listen();
    gulp.watch([path.src + '/*'], ['brew']);
});

gulp.task('clean', function () {
    del(path.dist + '/*');
});

gulp.task('default', ['build', 'watch']);