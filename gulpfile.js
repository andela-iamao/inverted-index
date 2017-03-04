const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('gulp-browserify');

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

 gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('dist/js/inverted-index.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./dist/script/js'))
});

gulp.task('watch-html', browserSync.reload);

// Default task
gulp.task('runserver', ['serve', 'watch-html'], () => {
  gulp.watch('./dist/*.html', ['watch-html']);
  gulp.watch('./dist/**/*.js', ['watch-html']);
  gulp.watch('./dist/css/*.css', ['watch-html']);
  gulp.watch('./dist/js/inverted-index.js', ['scripts']);
});
