var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var watchify = require('watchify');

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(watch) {

	var file = 'main.js';

	var props = {
		entries: ['./src/' + file],
		debug : true,
		transform: [babelify.configure( { presets: ['es2015', 'react'] })]
	};

	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle() {
		var stream = bundler.bundle();
		return stream
			.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulp.dest('./'))
	}

	// listen for an update and run rebundle
	bundler.on('update', function() {
		rebundle();
		gutil.log('Rebundle..');
	});

	// run it once the first time buildScript is called
	return rebundle();

}

function doSass() {
	if ( arguments.length ) {
		console.log('Sass file ' + arguments[0].path + ' changed.');
	}
	var start = new Date();
	console.log('Building CSS bundle');
	gulp.src( './sass/style.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( autoprefixer() )
		.pipe( gulp.dest( './' ) )
		.on( 'end', function() {
			console.log( 'CSS finished.' );
		} );
};

gulp.task( 'sass:build', function( cb ) {
	doSass();
	cb();
} );

gulp.task( 'sass:watch', function() {
	doSass();
	gulp.watch( './sass/**/*.scss', function( cb ) {
		doSass();
		cb();
	} );
} );

gulp.task( 'react:build', function( done ) {
	return buildScript(false); // this will once run once because we set watch to false
} );

gulp.task( 'react:watch', function( cb ) {
	return buildScript(true); // browserify watch for JS changes
} );

gulp.task( 'default', gulp.parallel( ['react:build', 'sass:build'] ) );
gulp.task( 'watch', gulp.parallel( ['react:watch', 'sass:watch'] ) );
