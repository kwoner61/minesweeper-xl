var filters = angular.module('Filters', []);

filters.filter('image',
  function() {
    return function(cell) {
      if (cell.isHidden) return "./img/hidden.png";
      else if (cell.isEmpty) return "./img/empty.png";
      return "./img/mine.png";
    }
});
