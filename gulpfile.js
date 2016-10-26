var gulp 		= require('gulp');
var concat 		= require('gulp-concat');
var minify 		= require('gulp-minify');
var stripDebug 	= require('gulp-strip-debug');
var rename 		= require('gulp-rename');
var connect		= require('gulp-connect');              // Stand alone server for testing purposes

gulp.task('default', function () {
  gulp.src(['src/**/module.js', 'src/**/*.js'])
      .pipe(concat('angular-turn.debug.js'))      
        .pipe(gulp.dest('./dist'))  
         .pipe(rename('angular-turn.js'))
        .pipe(stripDebug())   
		.pipe(minify({
		        ext:{
		            src:'.js',
		            min:'.min.js'
		        }
		    }))
		    .pipe(gulp.dest('./dist'))
		})

gulp.task('watch', ['default'], function () {
  gulp.watch('src/**/*.js', ['default'])
})

var serverConfig = {
    root: ".",
    port: 9001
};
/*
 *
 *         Start standalone server
 *
 */
gulp.task('server', function () {
    connect.server(serverConfig);
    //open('http://localhost:' + serverConfig.port);
});

// ---------------------------------------------- BUILD ----------------------------------------------
gulp.task('test-server', ['watch', 'server'], function () {
    console.log("Starting test server");
});
