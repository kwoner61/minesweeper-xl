var filters = angular.module('Filters', []);

filters.filter('image',
  function() {
    return function(cell) {
      if (cell.isHidden) return "./img/hidden.png";
      else if (cell.isEmpty && !cell.number) return "./img/empty.png";
      else if (!cell.number) return "./img/mine.png";
      return "./img/number-" + cell.number + ".png";
    }
});
