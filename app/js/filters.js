var filters = angular.module('Filters', []);

filters.filter('image',
  function() {
    return function(cell) {
      if (cell.isFlagged && cell.number!=-2) return "./img/flag-mine.png";
      else if (cell.isHidden) return "./img/hidden.png";
      else if (cell.isEmpty && !cell.number) return "./img/empty.png";
      else if (!cell.number) return "./img/mine.png";
      else if (cell.number == -1) return "./img/mine-wrong.png";
      else if (cell.number == -2) return "./img/flag-mine-wrong.png";
      return "./img/number-" + cell.number + ".png";
    }
});
