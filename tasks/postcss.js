
module.exports = function(grunt) {

	grunt.config('postcss', {
		options: {
			map: true,
			processors: [
				require('autoprefixer')({
					browsers: ['last 2 versions'],
					remove: false
				})
			]
		},
		dist: {
			src: 'build/style.css'
		}
	});

	grunt.loadNpmTasks('grunt-postcss');
};