/*
  To use Gulp is becoming to too old fashion. Webpack is growing faster. but for the simplicty let`s use Gulp for now.
  But I promise my next projects will be in Webpack!
*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src',
  'bower_components/font-awesome/scss'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
  .pipe(sourcemaps.init({loadMaps: true}))    
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    })
    
      .on('error', $.sass.logError))
    
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 11']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
