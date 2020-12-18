let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    del = require('del'),
    ghPages = require('gulp-gh-pages');

gulp.task('clean', async function(){
  del.sync('build')
})

gulp.task('copy', function () {
  return gulp.src([
    'app/fonts/**/*.{woff,woff2}',
  ], {
    base: 'app'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('css', function() {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
  ])
    .pipe(concat('libs.scss'))
    .pipe(gulp.dest('app/scss'))
});

gulp.task('scss', function () {
  return gulp.src([
    'app/scss/libs.scss',
    'app/scss/style.scss'
  ])
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    cascade: false
  }))
  .pipe(csso())
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
  return gulp.src('app/js/_*.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
  return gulp.src('app/*.html')
  .pipe(gulp.dest('build'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "build/"
      },
      notify: false,
      open: true,
  });

  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.series('js', 'script'));
});

gulp.task('refresh', function (done) {
  browserSync.reload();
  done();
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'css',
  'scss',
  'js',
  'script',
  'html'
));

gulp.task('default', gulp.series('build', 'browser-sync'));
