(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('blogController', Controller);

  Controller.$inject = ['Service'];

  function Controller(Service) {
    let vm = this;

    vm.text = 'Future blog page!'
  }
})();
