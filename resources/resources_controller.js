(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('resourcesController', Controller);

  Controller.$inject = ['Service'];

  function Controller(Service) {
    let vm = this;

    vm.text = 'Future resources page!'
  }
})();
