(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('showGameideaController', Controller);

  Controller.$inject = ['Service', '$stateParams', '$state', '$sce'];

  function Controller(Service, $stateParams, $state, $sce) {
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

    function greaterThan(prop, val){
    return function(item){
      return item[prop] > val;
    }

}

    //private
    function initController() {
      Service.get('gameideas/'+params.id).then(function(response) {
        vm.gameidea = response;
        vm.safeGameIdeaBody = $sce.trustAsHtml(vm.gameidea.body);
      });
    }

  } // end of Controller
})();
