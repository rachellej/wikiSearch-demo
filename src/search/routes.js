angular.module('routes.home', []);

angular.module('routes.home').config(function($stateProvider){

	$stateProvider

		.state('searchCategories', {
			url: '/',
			templateUrl: '/src/search/categories/template.html',
			controller: 'SearchController',
		})

		.state('searchPages', {
			url: '/pages/{searchTerm}/{category}',
			templateUrl: '/src/search/pages/template.html',
			controller: 'SearchPagesController',
		})
;});