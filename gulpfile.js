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
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
  .pipe(sourcemaps.init({loadMaps: true}))    
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
    
      .on('error', $.sass.logError))
    
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 11']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
