var minesweeperXlApp = angular.module('minesweeperXlApp', [
  'ngRoute',
  'Ctrl'
]);

minesweeperXlApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }
]);
