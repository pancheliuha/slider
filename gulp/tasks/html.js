'use strict';

module.exports = function() {

  $.gulp.task('html', function() {
    return $.gulp.src('./source/*.html')
      .pipe($.gulp.dest($.config.root));
  });
};
