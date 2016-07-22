var $           = require('gulp-load-plugins')();
var babelify    = require('babelify');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var critical    = require('critical').stream;
var del         = require('del');
var gulp        = require('gulp');
var packageJson = require('./package.json');
var path        = require('path');
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');
var swPrecache  = require('sw-precache');
var watchify    = require('watchify');

/* Tasks
   ========================================================================== */

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('assets', function() {
  return gulp.src(['src/browserconfig.xml', 'src/manifest.json'])
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'))
});

gulp.task('styles',function() {
  gulp.src('src/styles/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/styles/'))
});

gulp.task('critical', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(critical({
      css: ['dist/styles/main.css'],
      height: 700,
      inline: true,
      minify: true
    }))
    .pipe($.minifyHtml())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('service-worker', function(callback) {
  var rootDir = 'dist';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    cacheId: packageJson.name,
    staticFileGlobs: [rootDir + '/**/*.{js,json,html,css,png,jpg,gif,eot,ttf,woff}'],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('prod', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('connect', function() {
  $.connect.server({
    root: 'dist',
    port: 9000
  });
});

gulp.task('build', function(callback) {
  runSequence('assets', 'images', 'styles', 'critical',
    ['scripts'], 'service-worker', callback);
});

gulp.task('deploy', ['prod', 'build'], function() {
  return gulp.src('src/index.html', { read: false })
    .pipe($.shell(['firebase deploy']));
});

gulp.task('default', ['build'], function() {
  gulp.watch('src/styles/**/*', ['styles']);
  return buildScript('main.js', true);
});

gulp.task('watch', ['build'], function() {
  gulp.watch('src/styles/**/*', ['styles']);
  return buildScript('main.js', true);
});

gulp.task('default', ['connect', 'watch']);

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
    entries: ['src/scripts/' + file],
    debug : true,
    transform: [babelify.configure({ presets: ['react', 'es2015'] })]
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(buffer())
      .pipe($.uglify())
      .pipe($.rename('main.min.js'))
      .pipe(gulp.dest('dist/scripts'))
  }

  bundler.on('update', function() {
    rebundle();
    $.util.log('Rebundle...');
  });

  return rebundle();
}