
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
		 * @param array    categories
		 * @param string   key
		 * 
		 * @return array
		 */
		sortCategoriesAlphabetically: function(categories, key)
		{
			if (!key || (categories.length && !categories[0].hasOwnProperty(key)))
				return categories;

			return categories.sort(function(a, b) 
			{
				return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
			});
		},

		/**
		 * @param string    name
		 */
		getCategoryName: function(name)
		{
			if (name.indexOf('Category:') > -1)
				return name.split('Category:')[1];

			return name;
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
					title: self.getCategoryName(rawResult.title)
				});
			});

			return results;
		}
	});
	
});