
module.exports = function(grunt) {

	grunt.config('concat', {
		plugins_js: {
			src: [
				'node_modules/angular/angular.min.js',
				'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
				'node_modules/angular-sanitize/angular-sanitize.min.js',
				'node_modules/angular-mocks/angular-mocks.js',
			],
			dest: 'build/plugins.js'
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};