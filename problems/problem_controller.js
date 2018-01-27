(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('problemController', Controller);

  function Controller($scope, $http, Service) {
    let vm = this;

    // properties
    vm.problems = [];
    vm.show = {
      allProblems: true,
      editProblemForm: false,
      newProblemForm: false,
      singleProblem: false
    };

    // functions
    vm.addAnAnswerInput = addAnAnswerInput;
    vm.showNewQuestionForm = showNewQuestionForm;
    vm.deleteProblem = deleteProblem;
    vm.getProblems = getProblems;
    vm.initController = initController;
    vm.removeAnswerInput = removeAnswerInput;
    vm.showProblem = showProblem;
    vm.updateProblem = updateProblem;

    initController();

    function initController() {
      vm.getProblems();
    }

    function showNewQuestionForm() {
      vm.show = {};
      vm.show.newProblemForm = true;
      vm.problem = {};
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

    function getProblems() {
      Service.get('problems').then(function(response) {
        vm.problems = response;
      });
    }

    function showProblem(problem) {
      vm.show.singleProblem = true;
      Service.get('problems/'+problem.id).then(function(response) {
        vm.problem = response;
        console.log(response);
      });
    }

    function updateProblem() {
      if(vm.newProblemForm.$valid) {
        console.log(vm.problem.answers);
        Service.post('problems/',vm.problem).then(function(response) {
          vm.problem.answers.forEach(function(ans) {
            ans.problem_id = response.id;
            Service.post('answers/',ans).then(function(response) {
            });
          });
        });
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

    function removeAnswerInput(index) {
      console.log(index);
      vm.problem.answers.splice(index,1);
    }

    function deleteProblem(problem) {
      Service.delete('problems/'+problem.id).then(function(response) {
        console.log(response);
        // use map to get the deleted object from vm.problems by its id
        let deletedProblemIndex = vm.problems.map(function(prob) {
          return prob.id
        }).indexOf(problem.id);
        if(deletedProblemIndex > -1) {
          vm.problems.splice(deletedProblemIndex, 1);
        }
      });
    }

  }

})();
