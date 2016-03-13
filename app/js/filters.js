var filters = angular.module('Filters', []);

filters.filter('image',
  function() {
    return function(cell) {
      if (cell.isHidden && !cell.isFlagged) return "./img/hidden.png";
      else if (cell.isEmpty && !cell.number) return "./img/empty.png";
      else if (!cell.number && !cell.isFlagged) return "./img/mine.png";
      else if (cell.isFlagged) return "./img/flag-mine.png";
      return "./img/number-" + cell.number + ".png";
    }
});
