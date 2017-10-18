angular.module('routes.home', []);

angular.module('routes.home').config(function($stateProvider){

	$stateProvider

		.state('search', {
			url: '/',
			abstract: true,
			templateUrl: 'src/search/view/template.html',
			controller: 'SearchController',
		})

		.state('search.categories', {
			url: '',
			templateUrl: 'src/search/categories/template.html',
			controller: 'SearchCategoriesController',
		})

		.state('search.pages', {
			url: 'pages/{searchTerm}',
			templateUrl: 'src/search/pages/template.html',
			controller: 'SearchPagesController',
		})
;});