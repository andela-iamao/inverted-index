const gulp = require('gulp');
const browserSync = require('browser-sync');
const webpack = require('gulp-webpack');
const Server = require('karma').Server;
const expressServer = require('gulp-express');

gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('start', ['webpack'], () => {
  expressServer.run(['server.js']);
});

gulp.task('webpack', function() {
  return gulp.src('dist/js/InvertedIndex.js')
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
  gulp.watch('./dist/js/InvertedIndex.js', ['scripts']);
});
