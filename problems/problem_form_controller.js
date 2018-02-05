(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('problemFormController', Controller);

  Controller.$inject = ['Service', '$stateParams', '$state'];

  function Controller(Service, $stateParams, $state) {
    let vm = this;

    let params = $stateParams;

    // properties
    vm.problem = '';

    // functions
    vm.addAnAnswerInput = addAnAnswerInput;
    vm.removeAnswerInput = removeAnswerInput;
    vm.updateProblem = updateProblem;

    // initialize controller
    initController();

    // initialize properties

    // define functions
    function updateProblem() {
      if(vm.problemForm.$valid) {
        if(vm.problem.id) {
          vm.problem.answers_attributes = vm.problem.answers;
          delete vm.problem.answers;
          vm.problemObject = {};
          vm.problemObject.problem = vm.problem;
          Service.update('problems/'+vm.problemObject.problem.id,vm.problemObject).then(function(response) {
            $state.go('problems');
          });
        } else {
          Service.post('problems/',vm.problem).then(function(response) {
            if(vm.problem.answers.length > 0) {
              vm.problem.answers.forEach(function(ans) {
                ans.problem_id = response.id;
                Service.post('answers/',ans).then(function(response) {
                  $state.go('problems');
                });
              });
            } else {
              $state.go('problems');
            }
          });
        }
      }
    }

    function addAnAnswerInput() {
      let newAnswer = {
        statement: '',
        problem_id: -1,
        correct: false
      }
      if(vm.problem.answers.length < 5) {
        vm.problem.answers.push(newAnswer);
      }
    }

    function removeAnswerInput(index, answerId) {
      if(answerId) {
        Service.delete('answers/'+answerId);
      }
      vm.problem.answers.splice(index,1);
    }

    // private
    function initController() {
      if(params.id) {
        Service.get('problems/'+params.id).then(function(response) {
          vm.problem = response;
          console.log(vm.problem);
        });
      } else {
        vm.problem = {};
        vm.show = {};
        vm.show.newProblem = true;
        vm.problem.answers = [
          {
            statement: '',
            problem_id: -1,
            correct: false
          },
          {
            statement: '',
            problem_id: -1,
            correct: false
          }
        ];
      }
    }

  } // end of controller function
})();
