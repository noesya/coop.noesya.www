var gulp = require('gulp'),
    uglify = require('gulp-uglify');

function js () {
  'use strict';
  return gulp.src('_site/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('_site'));
};

exports.default = gulp.parallel(js);
