/**
 * Gulp tasks
 * @file gulpfile
 */

/*globals require, console, global*/

var connect = require('gulp-connect'),
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    cssnext = require('postcss-cssnext');

global.paths = {
    src: 'src',
    css: '/**/*.css',
    html: '/**/*.html',
    js: '/**/*.js',
    pcss: '/**/*.pcss'
};

gulp.task('connect', function () {
    'use strict';
    return connect.server({
        root: '.',
        livereload: true,
        port: 8181
    });
});

gulp.task('pcss', function () {
    'use strict';
    return gulp.src(global.paths.src + global.paths.pcss)
            .pipe(postcss([cssnext()]))
            .pipe(rename({extname: '.css'}))
            .pipe(gulp.dest(global.paths.src));
});

gulp.task('reload', ['pcss'], function () {
    'use strict';
    // there seems to be a bug with livereload and css files within web components, so forcing a reload using js files instead
    return gulp.src(global.paths.src + global.paths.js)
            .pipe(connect.reload());
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch(global.paths.src + global.paths.css, function (event) { gulp.src(event.path).pipe(connect.reload()); });
    gulp.watch(global.paths.src + global.paths.html, function (event) { gulp.src(event.path).pipe(connect.reload()); });
    gulp.watch(global.paths.src + global.paths.js, function (event) { gulp.src(event.path).pipe(connect.reload()); });
    gulp.watch(global.paths.src + global.paths.pcss, ['reload']);
});

gulp.task('default', ['connect', 'watch']);