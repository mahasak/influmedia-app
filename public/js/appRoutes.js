angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/landingPage/main.html',
			controller: 'LandingPageController'
		})
        .when('/#/register/influencer', {
			templateUrl: 'views/registerInfluencer/main.html',
			controller: 'RegisterInfluencerController'
		});

	$locationProvider.html5Mode(true);

}]);