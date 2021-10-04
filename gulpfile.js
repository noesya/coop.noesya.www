const gulp = require('gulp');
const uglify = require('gulp-uglify');

function js () {
  return gulp.src('_site/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('_site'));
};

exports.default = gulp.parallel(js);
