var ctrl = angular.module('Ctrl', []);

ctrl.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.createMineField = function() {
      var mineField = {};
      mineField.rows = [];
      for (var i=0; i<10; ++i) {
        row = {};
        row.cells = [];
        for (var j=0; j<10; ++j) {
          var cell = {};
          cell.isHidden = true;
          row.cells.push(cell);
        }
        mineField.rows.push(row);
      }
      return mineField;
    };

    $scope.mineField = $scope.createMineField();
  }
]);
