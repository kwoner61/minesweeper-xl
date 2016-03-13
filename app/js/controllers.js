var ctrl = angular.module('Ctrl', []);

ctrl.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.paused = false;
    $scope.numRows = 9;
    $scope.numColumns = 9;
    $scope.numMines = 10;
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
          cell.rowNum = i;
          cell.columnNum = j;
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

    $scope.mineField = $scope.createMineField();
    $scope.mineCoordinates = $scope.generateMines();
    $scope.calculateNumbers();

    $scope.unhideAll = function() {
      for (var i=0; i<$scope.numRows; ++i) {
        for (var j=0; j<$scope.numColumns; ++j) {
          $scope.getCell(i, j).isHidden = false;
        }
      }
    }

    $scope.showAllMines = function() {
      for (var i in $scope.mineCoordinates) {
        var mine = i.split(",");
        var row = parseInt(mine[0]);
        var column = parseInt(mine[1]);
        $scope.getCell(row, column).isHidden = false;
      }
    }

    $scope.startNewGame = function() {
      $scope.mineField = $scope.createMineField();
      $scope.mineCoordinates = $scope.generateMines();
      $scope.calculateNumbers();
    }

    $scope.uncoverRecNeighbors = function(row, column) {
      var numUncoveredCells = 0;
      var currentCell = $scope.getCell(row, column);

      if (!currentCell.isHidden) return 0;
      if (currentCell.number > 0) {
        currentCell.isHidden = false;
        return 1;
      }
      currentCell.isHidden = false;
      numUncoveredCells = 1;

      if ( $scope.validCell(row, column-1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row, column-1);

      if ( $scope.validCell(row-1, column-1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row-1, column-1);

      if ( $scope.validCell(row-1, column) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row-1, column);

      if ( $scope.validCell(row-1, column+1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row-1, column+1);

      if ( $scope.validCell(row, column+1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row, column+1);

      if ( $scope.validCell(row+1, column+1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row+1, column+1);

      if ( $scope.validCell(row+1, column) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row+1, column);

      if ( $scope.validCell(row+1, column-1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row+1, column-1);

      return numUncoveredCells;
    }

    $scope.uncoverRec = function(row, column) {
      var numUncoveredCells = 0;

      if ( $scope.validCell(row, column-1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row, column-1);

      if ( $scope.validCell(row-1, column-1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row-1, column-1);

      if ( $scope.validCell(row-1, column) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row-1, column);

      if ( $scope.validCell(row-1, column+1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row-1, column+1);

      if ( $scope.validCell(row, column+1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row, column+1);

      if ( $scope.validCell(row+1, column+1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row+1, column+1);

      if ( $scope.validCell(row+1, column) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row+1, column);

      if ( $scope.validCell(row+1, column-1) )
        numUncoveredCells += $scope.uncoverRecNeighbors(row+1, column-1);

      return numUncoveredCells;
    }

    $scope.uncover = function(cell) {
      if (!cell.isHidden || $scope.paused) return;
      if (!cell.isEmpty) {
        cell.isHidden = false;
        cell.number = -1;
        $scope.showAllMines();
        $scope.paused = true;
        return;
      }
      cell.isHidden = false;
      if (cell.number > 0)
        $scope.numHiddenCells--;
      else
        $scope.numHiddenCells -= 1+$scope.uncoverRec(cell.rowNum, cell.columnNum);

      if ($scope.numHiddenCells == $scope.numMines) {
        $scope.unhideAll();
        alert("You won!");
      }
    }

  }
]);
