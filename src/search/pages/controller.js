
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