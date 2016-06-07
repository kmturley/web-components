/**
 * Gulp tasks
 * @file gulpfile
 */

/*globals require, console, global*/

var connect = require('gulp-connect'),
    gulp = require('gulp');

global.paths = {
    src: 'src',
    css: '/**/*.css',
    html: '/**/*.html',
    js: '/**/*.js'
};

gulp.task('connect', function () {
    'use strict';
    return connect.server({
        root: '.',
        livereload: true,
        port: 8181
    });
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch([global.paths.src + global.paths.css], function (event) { console.log('css', event.path); gulp.src(event.path).pipe(connect.reload()); });
    gulp.watch([global.paths.src + global.paths.html], function (event) { gulp.src(event.path).pipe(connect.reload()); });
    gulp.watch([global.paths.src + global.paths.js], function (event) { gulp.src(event.path).pipe(connect.reload()); });
});

gulp.task('default', ['connect', 'watch']);