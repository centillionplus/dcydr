angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  
  .when('/view1', {
    templateUrl: 'views/view1.html'
  })

  .when('/view2a', {
    templateUrl: 'views/view2a.html'
  })

  .when('/view2b', {
    templateUrl: 'views/view2b.html'
  })

  .when('/view3', {
    templateUrl: 'views/view3.html'
  })

  .otherwise({
    redirectTo: "/view1"
  });

  $locationProvider.html5Mode({
    // uncommenting the line below would cosmetically make the urls look nicer in the browser without showing the "/#" in each route. However, it causes refresh not to work.
    // enabled: true,
    // This line was added because we seemed to be getting an error without it
    requireBase: false
  });

}]);