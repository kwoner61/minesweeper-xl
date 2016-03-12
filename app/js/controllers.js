var ctrl = angular.module('Ctrl', []);

ctrl.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.numRows = 2;
    $scope.numColumns = 2;
    $scope.numMines = 1;
    $scope.numHiddenCells = $scope.numRows * $scope.numColumns;

    $scope.createMineField = function() {
      var mineField = {};
      mineField.rows = [];
      for (var i=0; i<$scope.numRows; ++i) {
        row = {};
        row.cells = [];
        for (var j=0; j<$scope.numColumns; ++j) {
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
      var m = 0;
      while (m < $scope.numMines) {
        var row = Math.floor(Math.random() * $scope.numRows);
        var column = Math.floor(Math.random() * $scope.numColumns);
        var key = "";
        key += row + ",";
        key += column;

        if (!mineCoordinates[key]) {
          mineCoordinates[key] = 1;
          $scope.plantMine(row, column);
          m++;
        }
      }
      return mineCoordinates;
    }

    $scope.validCell = function(row, column) {
      return row>=0 && row<$scope.numRows && column>=0 && column<$scope.numColumns;
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
      for (var i=0; i<$scope.numRows; ++i) {
        for (var j=0; j<$scope.numColumns; ++j) {
          $scope.getCell(i, j).isHidden = false;
        }
      }
    }

    $scope.uncover = function(cell) {
      if (!cell.isHidden) return;
      cell.isHidden = false;
      $scope.numHiddenCells--;
      if (!cell.isEmpty) {
        $scope.unhideAll();
        alert("Kaboom! You lose!");
      }
      else if ($scope.numHiddenCells == $scope.numMines) {
        $scope.unhideAll();
        alert("You won!");
      }
    }

    $scope.mineField = $scope.createMineField();
    $scope.mineCoordinates = $scope.generateMines();
    $scope.calculateNumbers();
  }
]);
