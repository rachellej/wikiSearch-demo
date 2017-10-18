module.exports = function(grunt)
{
	grunt.config('browserify', {
		modules: {
			src: [
				'src/foundation/**/*.js',
				'src/search/**/*.js',
			],
			dest: 'build/search.js'
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
};