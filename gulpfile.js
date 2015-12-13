var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./_book/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['deploy'], function() {
  console.log('complete!')
});