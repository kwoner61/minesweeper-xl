var ctrl = angular.module('Ctrl', []);

ctrl.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.paused = false;
    $scope.numRows = 9;
    $scope.numColumns = 9;
    $scope.numMines = 10;
    $scope.face = "happy";
    $scope.firstClick = "";

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
          cell.isFlagged = false;
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
        if (!mineCoordinates[key] && key != $scope.firstClick) {
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
    $scope.mineCoordinates = {};

    $scope.unhideAll = function() {
      for (var i=0; i<$scope.numRows; ++i) {
        for (var j=0; j<$scope.numColumns; ++j) {
          $scope.getCell(i, j).isHidden = false;
        }
      }
    }

    $scope.showAllMines = function() {
      for (var i=0; i<$scope.numRows; ++i) {
        for (var j=0; j<$scope.numColumns; ++j) {
          var cell = $scope.getCell(i, j);

          if (!cell.isFlagged && !cell.isEmpty) {
            cell.isHidden = false;
          }
          else if (cell.isFlagged && cell.isEmpty) {
            cell.number = -2;
            cell.isHidden = false;
          }
        }
      }
    }

    $scope.flagAllMines = function() {
      for (var i in $scope.mineCoordinates) {
        var mine = i.split(",");
        var row = parseInt(mine[0]);
        var column = parseInt(mine[1]);
        $scope.getCell(row, column).isFlagged = true;
      }
    }

    $scope.checkWinCondition = function() {
      var won = true;
      for (var i=0; i<$scope.numRows; ++i) {
        for (var j=0; j<$scope.numColumns; ++j) {
          var cell = $scope.getCell(i, j);
          if (cell.isEmpty && cell.isHidden) {
            won = false;
          }
        }
      }
      return won;
    }

    $scope.startNewGame = function() {
      $scope.mineField = $scope.createMineField();
      $scope.mineCoordinates = {};
      $scope.paused = false;
      $scope.face = "happy";
      $scope.firstClick = "";
    }

    $scope.uncoverRecNeighbors = function(row, column) {
      var currentCell = $scope.getCell(row, column);

      if (!currentCell.isHidden) return;
      if (currentCell.number > 0) {
        currentCell.isHidden = false;
        return;
      }
      currentCell.isHidden = false;
      if ( $scope.validCell(row, column-1) )
        $scope.uncoverRecNeighbors(row, column-1);

      if ( $scope.validCell(row-1, column-1) )
        $scope.uncoverRecNeighbors(row-1, column-1);

      if ( $scope.validCell(row-1, column) )
        $scope.uncoverRecNeighbors(row-1, column);

      if ( $scope.validCell(row-1, column+1) )
        $scope.uncoverRecNeighbors(row-1, column+1);

      if ( $scope.validCell(row, column+1) )
        $scope.uncoverRecNeighbors(row, column+1);

      if ( $scope.validCell(row+1, column+1) )
        $scope.uncoverRecNeighbors(row+1, column+1);

      if ( $scope.validCell(row+1, column) )
        $scope.uncoverRecNeighbors(row+1, column);

      if ( $scope.validCell(row+1, column-1) )
        $scope.uncoverRecNeighbors(row+1, column-1);
    }

    $scope.uncoverRec = function(row, column) {
      if ( $scope.validCell(row, column-1) )
        $scope.uncoverRecNeighbors(row, column-1);

      if ( $scope.validCell(row-1, column-1) )
        $scope.uncoverRecNeighbors(row-1, column-1);

      if ( $scope.validCell(row-1, column) )
        $scope.uncoverRecNeighbors(row-1, column);

      if ( $scope.validCell(row-1, column+1) )
        $scope.uncoverRecNeighbors(row-1, column+1);

      if ( $scope.validCell(row, column+1) )
        $scope.uncoverRecNeighbors(row, column+1);

      if ( $scope.validCell(row+1, column+1) )
        $scope.uncoverRecNeighbors(row+1, column+1);

      if ( $scope.validCell(row+1, column) )
        $scope.uncoverRecNeighbors(row+1, column);

      if ( $scope.validCell(row+1, column-1) )
        $scope.uncoverRecNeighbors(row+1, column-1);
    }

    $scope.uncover = function(cell) {
      if (!$scope.firstClick) {
        $scope.firstClick = cell.rowNum + "," + cell.columnNum;
        $scope.mineCoordinates = $scope.generateMines();
        $scope.calculateNumbers();
      }
      if (!cell.isHidden || $scope.paused || cell.isFlagged) return;
      if (!cell.isEmpty) {
        cell.isHidden = false;
        cell.number = -1;
        $scope.showAllMines();
        $scope.paused = true;
        $scope.face = "sad";
        return;
      }
      cell.isHidden = false;
      if (!cell.number)
        $scope.uncoverRec(cell.rowNum, cell.columnNum);

      if ( $scope.checkWinCondition() ) {
        $scope.paused = true;
        $scope.flagAllMines();
        $scope.face = "cool";
      }
    }

    $scope.flag = function(cell) {
      if (cell.isHidden && !$scope.paused)
        cell.isFlagged = !cell.isFlagged;
    }

  }
]);
