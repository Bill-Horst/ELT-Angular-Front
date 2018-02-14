(function() {
  'use strict';

  angular
  .module('elt-app')
  .directive('navigation', navigation)
  .directive('bottomFooter', bottom_footer);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: 'app_directives/navbar.html'
    }
  }

  function bottom_footer() {
    return {
      restrict: 'E',
      templateUrl: 'app_directives/bottom_footer.html'
    }
  }

})();
