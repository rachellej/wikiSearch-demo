(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('search', [
	'routes', 
	'ngSanitize'
]);


},{}],2:[function(require,module,exports){
angular.module('routes', ['ui.router', 'routes.home']);

angular.module('routes').config(function($stateProvider, $urlRouterProvider, $locationProvider)
{
	//set the app to html5 mode
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

});
},{}],3:[function(require,module,exports){

angular.module('search').controller('SearchCategoriesController', function($scope, Search)
{
	angular.extend($scope, {

		/**
		 * @type object
		 */
		searchData: Search.data,

		/**
		 * @type array
		 */
		categories: [],

		/**
		 * @param string    searchTerm
		 * @param string    contrinueTerm
		 */
		search: function(searchTerm, continueTerm)
		{
			Search.searchCategories(searchTerm, continueTerm || null).then(function(result)
			{
				//if not the most recent search, don't update
				if (searchTerm != $scope.searchData.term)
					return;

				$scope.categories.push.apply($scope.categories, result.data);

				//keeping it simple -- but irl I'd paginate this
				if (result.continueTerm)
					$scope.search($scope.searchData.term, result.continueTerm);
			});
		}
	});

	$scope.$watch('searchData.term', function(newValue)
	{
		if (!!newValue)
		{
			$scope.categories = [];
			$scope.search(newValue);
		}

		else
			$scope.categories = [];
	});

});
},{}],4:[function(require,module,exports){

angular.module('search').controller('SearchPagesController', function($scope, $state, Search)
{
	angular.extend($scope, {

		/**
		 * @type string
		 */
		searchTerm: $state.params.searchTerm,

		/**
		 * @type array
		 */
		pages: [],

		init: function()
		{
			if ($scope.searchTerm != Search.data.term)
				Search.data.term = $scope.searchTerm;
		},

		/**
		 * @param string    searchTerm
		 * @param string    startFrom
		 */
		search: function(searchTerm, startFrom)
		{
			Search.searchPages(searchTerm, startFrom || 0).then(function(result)
			{
				$scope.pages.push.apply($scope.pages, result.data);

				//keeping it simple -- but irl I'd paginate this
				if (result.startFrom)
					$scope.search($scope.searchTerm, result.startFrom);
			});
		}
	});

	$scope.init();
	$scope.search($scope.searchTerm);
});
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){

angular.module('search').service('Search', function($q, $http, $sce)
{
	var self = this;

	return angular.extend(this, {

		/**
		 * @type object
		 */
		data: {
			term: ''
		},

		/**
		 * @type string
		 */
		endpoint: 'https://en.wikipedia.org/w/api.php?format=json&',

		/**
		 * @return string
		 */
		buildUrl: function(src)
		{
		    return $sce.trustAsResourceUrl(self.endpoint + src);
		},

		/**
		 * @param string    term
		 * @param string    continueFromTerm
		 * @param int       page
		 */
		searchCategories: function(term, continueFromTerm, page)
		{
			var deferred = $q.defer();

			$http({
				method: 'JSONP',
				url: self.buildUrl('action=query&generator=allcategories&gacprefix=' + term + '&gaccontinue=' + (continueFromTerm || ''))
			}).then(function(result)
			{
				deferred.resolve({
					continueTerm: result.data.continue ? result.data.continue.gaccontinue : null,
					data: self.sortCategoriesAlphabetically(self.buildCategories(result.data.query.pages || {}), 'title'),
				});
			});

			return deferred.promise;
		},

		/**
		 * @param string    term
		 * @param int       startFrom
		 */
		searchPages: function(term, startFrom)
		{
			var deferred = $q.defer();

			$http({
				method: 'JSONP',
				url: self.buildUrl('action=query&list=search&srsearch='+ term +'&srlimit=10&formatversion=2&sroffset=' + (startFrom || 0)),
			}).then(function(result)
			{
				deferred.resolve({
					startFrom: result.data.continue ? result.data.continue.sroffset : null,
					data: result.data.query.search || [],
				});
			});

			return deferred.promise;
		},

		/**
		 * @param object    categories
		 * @param string    key
		 * 
		 * @return array
		 */
		sortCategoriesAlphabetically: function(categories, key)
		{
			return categories.sort(function(a, b) 
			{
				return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
			});
		},

		/**
		 * @param object    rawResults
		 */
		buildCategories: function(rawResults)
		{
			var results = [];

			angular.forEach(rawResults, function(rawResult)
			{
				results.push({
					id: rawResult.pageId,
					name: rawResult.title,
					title: rawResult.title.split('Category:')[1]
				});
			});

			return results;
		}
	});
	
});
},{}],7:[function(require,module,exports){

angular.module('search').controller('SearchController', function($scope, $state, Search)
{
	angular.extend($scope, {

		/**
		 * @type object
		 */
		searchData: Search.data,

		/**
		 * @return boolean
		 */
		canClearInput: function()
		{
			return $state.current.name == 'search.categories';
		},

		reset: function()
		{
			$scope.searchData.term = '';
		},

	});

	$scope.$watch('searchData.term', function(newValue)
	{
		if ($state.current.name == 'search.pages')
			$state.go('search.categories');

	});
});
},{}]},{},[1,2,3,4,5,6,7]);
