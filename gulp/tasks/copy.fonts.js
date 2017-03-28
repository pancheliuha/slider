'use strict';

module.exports = function() {
	$.gulp.task('copy_fonts', function() {
		return $.gulp.src(['./source/fonts/**/*'])
			.pipe($.gulp.dest($.config.root + '/assets/fonts'));
	});
};