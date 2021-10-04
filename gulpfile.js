const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const prefix = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

function html () {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('_site'));
};

function js () {
  return gulp.src('_site/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('_site'));
};

function css () {
  return gulp.src('_site/**/*.css')
    // .pipe(purgecss({
    //   content: ['_site/**/*.html']
    // }))
    .pipe(prefix())
    .pipe(cleanCSS())
    .pipe(gulp.dest('_site'));
};

exports.default = gulp.parallel(css, js, html);
