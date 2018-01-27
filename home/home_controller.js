(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('homeController', Controller);

function Controller($scope) {
  let vm = this;

  vm.text = 'sup?';
}

})();
