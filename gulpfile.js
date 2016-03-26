var gulp = require('gulp'),
    uglify = require('gulp-uglify');
    minify = require('gulp-clean-css');
    rename = require('gulp-rename');

gulp.task('watch', function() {
  gulp.watch('*.js', ['js']);
});

gulp.task('js', function() {
  return gulp.src('jquery.hotmenu.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('hotmenu.css')
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'css']);
