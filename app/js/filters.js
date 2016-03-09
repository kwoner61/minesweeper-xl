var filters = angular.module('Filters', []);

filters.filter('image',
  function() {
    return function(cell) {
      if (cell.isHidden) return "./img/hidden.png";
      return "./img/empty.png";
    }
});
