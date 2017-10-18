module.exports = function(grunt)
{
	grunt.config('watch', {
		scripts: {
			files: [
				'src/**/*.js',
				'tests/**/*.js',
			],
			tasks: ['browserify', 'karma'] //would normally minify but leaving as it in case want to be able to read these files
		},
		sass: {
			files: [
				'src/**/*.scss',
				'sass/**/*.scss'
			],
			tasks: ['sass', 'postcss']
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};