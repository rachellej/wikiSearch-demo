
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