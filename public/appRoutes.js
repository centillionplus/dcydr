angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

  // index page - Header with view1
  .when('/', {
    templateUrl: 'views/index.html',
    controller: 'MainController'
  })
  
  .when('/view1', {
    templateUrl: 'views/view1.html',
    controller: 'MainController'
  });

  .when('/view2a', {
    templateUrl: 'views/view2a.html',
    controller: 'MainController'
  });

  .when('/view2b', {
    templateUrl: 'views/view2b.html',
    controller: 'MainController'
  });

  .when('/view3', {
    templateUrl: 'views/view3.html',
    controller: 'MainController'
  });

  $locationProvider.html5Mode(true);

}]);