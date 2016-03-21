var $          = require('gulp-load-plugins')();
var babelify   = require('babelify');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var critical   = require('critical').stream;
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');

/* Tasks
   ========================================================================== */

gulp.task('fonts',function() {
  gulp.src([
    'node_modules/octicons/octicons/octicons.eot',
    'node_modules/octicons/octicons/octicons.ttf',
    'node_modules/octicons/octicons/octicons.woff'
  ])
  .pipe(gulp.dest('build/styles/'))
});

gulp.task('styles',function() {
  gulp.src('styles/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe(gulp.dest('build/styles/'))
});

gulp.task('critical', function () {
  return gulp.src('index.html')
    .pipe(critical({
      css: ['build/styles/main.css'],
      height: 700,
      inline: true,
      minify: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('prod', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('deploy', ['prod', 'fonts', 'styles', 'scripts'], function() {
  return gulp.src('index.html', { read: false })
    .pipe($.shell(['firebase deploy']));
});

gulp.task('default', ['fonts', 'styles', 'scripts'], function() {
  gulp.watch('styles/**/*', ['styles']);
  return buildScript('main.js', true);
});

/* Util
   ========================================================================== */

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  $.notify.onError({
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
      .pipe($.uglify())
      .pipe($.rename('main.min.js'))
      .pipe(gulp.dest('./build'))
  }

  bundler.on('update', function() {
    rebundle();
    $.util.log('Rebundle...');
  });

  return rebundle();
}