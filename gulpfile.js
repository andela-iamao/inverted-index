const gulp = require('gulp');
const browserSync = require('browser-sync');


gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('watch-html', browserSync.reload);

// Default task
gulp.task('runserver', ['serve', 'watch-html'], () => {
  gulp.watch('./dist/*.html', ['watch-html']);
  gulp.watch('./dist/**/*.js', ['watch-html']);
  gulp.watch('./dist/css/*.css', ['watch-html']);
});
