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
          cell.number = 0;
          row.cells.push(cell);
        }
        mineField.rows.push(row);
      }
      return mineField;
    };

    $scope.getCell = function(row, column) {
      return $scope.mineField.rows[row].cells[column];
    }

    $scope.plantMine = function(row, column) {
      $scope.mineField.rows[row].cells[column].isEmpty = false;
    }

    $scope.generateMines = function() {
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
      return mineCoordinates;
    }

    $scope.validCell = function(row, column) {
      return row>=0 && row<10 && column>=0 && column<10;
    }

    $scope.countNeighborMines = function(row, column) {
      var numNeighborMines = 0;
      if ( $scope.validCell(row, column-1) && !$scope.getCell(row, column-1).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row-1, column-1) && !$scope.getCell(row-1, column-1).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row-1, column) && !$scope.getCell(row-1, column).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row-1, column+1) && !$scope.getCell(row-1, column+1).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row, column+1) && !$scope.getCell(row, column+1).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row+1, column+1) && !$scope.getCell(row+1, column+1).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row+1, column) && !$scope.getCell(row+1, column).isEmpty )
        numNeighborMines++;

      if ( $scope.validCell(row+1, column-1) && !$scope.getCell(row+1, column-1).isEmpty )
        numNeighborMines++;
      return numNeighborMines;
    }

    $scope.calculateNumbers = function() {
      for (var i in $scope.mineCoordinates) {
        var mine = i.split(",");
        var row = parseInt(mine[0]);
        var column = parseInt(mine[1]);

        if ( $scope.validCell(row, column-1) && $scope.getCell(row, column-1).isEmpty )
          $scope.getCell(row, column-1).number = $scope.countNeighborMines(row, column-1);

        if ( $scope.validCell(row-1, column-1) && $scope.getCell(row-1, column-1).isEmpty )
          $scope.getCell(row-1, column-1).number = $scope.countNeighborMines(row-1, column-1);

        if ( $scope.validCell(row-1, column) && $scope.getCell(row-1, column).isEmpty )
          $scope.getCell(row-1, column).number = $scope.countNeighborMines(row-1, column);

        if ( $scope.validCell(row-1, column+1) && $scope.getCell(row-1, column+1).isEmpty )
          $scope.getCell(row-1, column+1).number = $scope.countNeighborMines(row-1, column+1);

        if ( $scope.validCell(row, column+1) && $scope.getCell(row, column+1).isEmpty )
          $scope.getCell(row, column+1).number = $scope.countNeighborMines(row, column+1);

        if ( $scope.validCell(row+1, column+1) && $scope.getCell(row+1, column+1).isEmpty )
          $scope.getCell(row+1, column+1).number = $scope.countNeighborMines(row+1, column+1);

        if ( $scope.validCell(row+1, column) && $scope.getCell(row+1, column).isEmpty )
          $scope.getCell(row+1, column).number = $scope.countNeighborMines(row+1, column);

        if ( $scope.validCell(row+1, column-1) && $scope.getCell(row+1, column-1).isEmpty )
          $scope.getCell(row+1, column-1).number = $scope.countNeighborMines(row+1, column-1);

      }
    }

    $scope.unhideAll = function() {
      for (var i=0; i<10; ++i) {
        for (var j=0; j<10; ++j) {
          $scope.getCell(i, j).isHidden = false;
        }
      }
    }

    $scope.mineField = $scope.createMineField();
    $scope.mineCoordinates = $scope.generateMines();
    $scope.calculateNumbers();
  }
]);
