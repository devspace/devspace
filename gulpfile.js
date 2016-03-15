var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

gulp.task('styles',function() {
  gulp.src([
    'node_modules/octicons/octicons/octicons.eot',
    'node_modules/octicons/octicons/octicons.ttf',
    'node_modules/octicons/octicons/octicons.woff'
  ])
  .pipe(gulp.dest('build/styles/'))

  gulp.src('styles/main.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/styles/'))
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

function buildScript(file, watch) {
  var props = {
    entries: ['scripts/' + file],
    debug : true,
    transform:  [babelify.configure({stage : 0 })]
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest('./build'))
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('default', ['styles', 'scripts'], function() {
  gulp.watch('styles/**/*', ['styles']);
  return buildScript('main.js', true);
});
