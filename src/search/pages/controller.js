
angular.module('search').controller('SearchPagesController', function($scope, $state, Search)
{
	angular.extend($scope, {

		/**
		 * @type string
		 */
		category: $state.params.category,

		/**
		 * @type object
		 */
		searchData: Search.data,

		/**
		 * @type array
		 */
		pages: [],

		init: function()
		{
			if (!Search.data.term)
				Search.data.term = $state.params.searchTerm;
		},

		/**
		 * @param string    searchTerm
		 * @param string    startFrom
		 */
		search: function(searchTerm, startFrom)
		{
			Search.searchPages(searchTerm, startFrom || 0).then(function(result)
			{
				[].push.apply($scope.pages, result.data);

				//keeping it simple -- but irl I'd paginate this
				if (result.startFrom)
					$scope.search($scope.category, result.startFrom);
			});
		}
	});

	$scope.init();
	$scope.search($scope.category);
});