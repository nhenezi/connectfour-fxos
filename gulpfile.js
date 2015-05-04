var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('concat');
var babelify = require('babelify');

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./src/js/index.jsx'],
    transform: [babelify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher.on('update', function() {
    var updateStart = Date.now();
    console.log('Updating!');
    watcher.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/js'));
    console.log('Updated', (Date.now() - updateStart) + 'ms');
  })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('css', function () {
  gulp.src('./static/css/*.css')
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('foundation', function() {
  gulp.src('./bower_components/foundation/css/normalize.css')
    .pipe(gulp.dest('./build/css/'));
  gulp.src('./bower_components/foundation/css/foundation.css')
    .pipe(gulp.dest('./build/css/'));

  gulp.src('./bower_components/foundation/js/foundation.min.js')
    .pipe(gulp.dest('./build/js'));
  gulp.src('./bower_components/foundation/js/vendor/modernizr.js')
    .pipe(gulp.dest('./build/js'));
  gulp.src('./bower_components/foundation/js/vendor/jquery.js')
    .pipe(gulp.dest('./build/js'));
  gulp.src('./bower_components/foundation/js/vendor/fastclick.js')
    .pipe(gulp.dest('./build/js'));
});

gulp.task('gaia-bb', function() {
  gulp.src('./bower_components/building-blocks/style/buttons.css')
    .pipe(gulp.dest('./build/css/'));
  gulp.src('./bower_components/building-blocks/style/input_areas.css')
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('html', function() {
  gulp.src('./static/html/*.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('manifest', function() {
  gulp.src('./static/manifest.webapp')
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['browserify', 'css', 'html', 'manifest', 'gaia-bb',
          'foundation']);
