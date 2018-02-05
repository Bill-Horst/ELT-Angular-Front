(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('showGameideaController', Controller);

  Controller.$inject = ['Service', '$stateParams', '$state'];

  function Controller(Service, $stateParams, $state) {
    let vm = this;

    let params = $stateParams;

    // properties
    vm.gameidea = '';

    // functions
    vm.deleteGameidea = deleteGameidea;

    // initialize controller
    initController();

    function deleteGameidea(gameidea) {
      Service.delete('gameideas/'+gameidea.id).then(function(response) {
        $state.go('gameideas');
      });
      // TODO: toastr message
    }

    //private
    function initController() {
      Service.get('gameideas/'+params.id).then(function(response) {
        vm.gameidea = response;
      });
    }

  } // end of Controller
})();
