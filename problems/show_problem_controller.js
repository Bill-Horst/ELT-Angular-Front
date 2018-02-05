(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('showProblemController', Controller);

  Controller.$inject = ['Service', '$stateParams', '$state'];

  function Controller(Service, $stateParams, $state) {
    let vm = this;

    let params = $stateParams;

    // properties
    vm.problem = '';
    vm.show = {};

    // functions
    vm.deleteProblem = deleteProblem;

    // initialize controller
    initController();

    function deleteProblem(problem) {
      Service.delete('problems/'+problem.id).then(function(response) {
        $state.go('problems');
        // TODO: put toastr message saying it was deleted
      });
    }

    // private
    function initController() {
      Service.get('problems/'+params.id).then(function(response) {
        vm.problem = response;
        console.log(vm.problem);
        vm.show.showProblem = true;
      });
    }

  } // end of controller function
})();
