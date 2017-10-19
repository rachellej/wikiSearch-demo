
angular.module('search').controller('SearchController', function($scope, $state, Search)
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

				[].push.apply($scope.categories, result.data);

				//keeping it simple -- but irl I'd paginate this
				if (result.continueTerm)
					$scope.search($scope.searchData.term, result.continueTerm);
			});
		},

		reset: function()
		{
			$scope.searchData.term = '';
		},

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