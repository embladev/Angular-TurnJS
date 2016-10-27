// Initialize dependancies
var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var stripDebug = require('gulp-strip-debug');
var rename = require('gulp-rename');
var connect = require('gulp-connect');              // Stand alone server for testing purposes

/*
 *
 *         Default compile function / copy to distribution
 *
 */

gulp.task('default', function () {
    gulp.src(['src/**/module.js', 'src/**/*.js'])
        .pipe(concat('angular-turn.debug.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('angular-turn.js'))
        .pipe(stripDebug())
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('./dist'))
})

/*
 *
 *         Watch task
 *
 */



var serverConfig = {
    root: ".",
    port: 9001
};
/*
 *
 *         Start standalone server
 *
 */
gulp.task('server',['default'], function () {
    connect.server(serverConfig);
    gulp.watch('src/**/*.js', ['default'])  // watch src files
    //open('http://localhost:' + serverConfig.port);
});

// ---------------------------------------------- BUILD ----------------------------------------------
gulp.task('test-server', ['watch', 'server'], function () {
    console.log("Starting test server");
});