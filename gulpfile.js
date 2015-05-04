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


/*
gulp.task('bootstrap', function() {
  gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./build/css/'));
  gulp.src('./bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff')
    .pipe(gulp.dest('./build/fonts'));
  gulp.src('./bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2')
    .pipe(gulp.dest('./build/fonts'));
  gulp.src('./bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf')
    .pipe(gulp.dest('./build/fonts'));

});
*/

gulp.task('html', function() {
  gulp.src('./static/html/*.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('manifest', function() {
  gulp.src('./static/manifest.webapp')
    .pipe(gulp.dest('./build/'));
})

gulp.task('default', ['browserify', 'css', 'html', 'manifest']);
