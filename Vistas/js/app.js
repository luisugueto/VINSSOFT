angular.module('appVS', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('index', {
				url: '/index',
				templateUrl: 'views/index.html'
			});
		$urlRouterProvider.otherwise('index');
	});