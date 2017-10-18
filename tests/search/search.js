describe('search', function()
{
	beforeEach(module('search'));

	var search;

	beforeEach(inject(function(_Search_)
	{
		search = _Search_;
	}));

	it("should format categories", function()
	{
		expect(search.buildCategories({})).toEqual([]);

		expect(search.buildCategories({
			test: {
				pageId: '123', 
				title: 'Category:123'
			}
		})).toEqual([
			{
				id: '123',
				name: 'Category:123',
				title: '123'
			}
		]);
	});

	it("should alphabetically sort categories", function()
	{
		expect(search.sortCategoriesAlphabetically([])).toEqual([]);

		//no sort key
		expect(search.sortCategoriesAlphabetically([
			{ title: 'B' }, { title: 'A' }
		])).toEqual([
			{ title: 'B' }, { title: 'A' }
		]);

		//sort key provided but key doesn't exist on objects
		expect(search.sortCategoriesAlphabetically([
			{ nope: 'B' }
		], 'title')).toEqual([
			{ nope: 'B' }
		]);

		expect(search.sortCategoriesAlphabetically([
			{ title: 'B' }, { title: 'A' }
		], 'title')).toEqual([
			{ title: 'A' }, { title: 'B' }
		]);
	});
});