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
          cell.isEmpty = true;
          row.cells.push(cell);
        }
        mineField.rows.push(row);
      }
      return mineField;
    };

    $scope.mineField = $scope.createMineField();

    $scope.plantMine = function(row, column) {
      $scope.mineField.rows[row].cells[column].isEmpty = false;

    }

    $scope.generateMines = function() {
      // Generate 20 random locations (row, column)
      // No repeats!
      var mineCoordinates = {};
      var numMines = 0;
      while (numMines < 20) {
        var row = Math.floor(Math.random() * 10);
        var column = Math.floor(Math.random() * 10);
        var key = "";
        key += row + ",";
        key += column;

        if (!mineCoordinates[key]) {
          mineCoordinates[key] = 1;
          $scope.plantMine(row, column);
          numMines++;
        }

      }
    }

    $scope.generateMines();



  }
]);
