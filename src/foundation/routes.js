angular.module('routes', ['ui.router', 'routes.home']);

angular.module('routes').config(function($stateProvider, $urlRouterProvider, $locationProvider)
{
	//set the app to html5 mode
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

});