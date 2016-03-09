var minesweeperXlApp = angular.module('minesweeperXlApp', [
  'ngRoute',
  'Ctrl',
  'Filters'
]);

minesweeperXlApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }
]);
