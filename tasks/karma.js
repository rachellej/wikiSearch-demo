module.exports = function(grunt)
{
	grunt.config('karma', {
		options: {
			basePath: '',
			autoWatch: false,
			frameworks: ['jasmine'],
			files: [
				'build/plugins.js',
				'build/search.js',
				'tests/**/*.js'
			],
			browsers: ['PhantomJS']
		},
		unit: {
			singleRun: true
		}
	});

	grunt.loadNpmTasks('grunt-karma');
};