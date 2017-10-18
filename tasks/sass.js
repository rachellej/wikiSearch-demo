
module.exports = function(grunt) {

	grunt.config('sass', {
		dist: {
			options: {
				style: 'nested',
			},
			files: {
				'build/style.css': 'src/style.scss',
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
};