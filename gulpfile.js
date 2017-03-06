const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('gulp-browserify');
const webpack = require('gulp-webpack');
const webpack_conf = require('./webpack.config.js');
const Server = require('karma').Server;

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('webpack', function() {
  return gulp.src('dist/js/inverted-index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('dist/build'));
});

gulp.task('runtests', ['webpack'], function(done) {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('watch-html', browserSync.reload);

// Default task
gulp.task('runserver', ['webpack', 'serve', 'watch-html'], () => {
  gulp.watch('./dist/*.html', ['watch-html']);
  gulp.watch('./dist/**/*.js', ['watch-html']);
  gulp.watch('./dist/css/*.css', ['watch-html']);
  gulp.watch('./dist/js/inverted-index.js', ['scripts']);
});
