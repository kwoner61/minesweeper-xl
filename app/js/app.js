var minesweeperXlApp = angular.module('minesweeperXlApp', [
  'ngRoute',
  'Ctrl',
  'Filters',
  'Directives'
]);

minesweeperXlApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }
]);
