(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('problemController', Controller);

  Controller.$inject = ['$scope','Service'];

  function Controller($scope, Service) {
    let vm = this;

    // properties
    vm.gridOptions = {};
    vm.loading = false;
    vm.problems = [];
    vm.show = {};

    // functions
    vm.addAnAnswerInput = addAnAnswerInput;
    vm.deleteProblem = deleteProblem;
    vm.editProblem = editProblem;
    vm.getProblems = getProblems;
    vm.initController = initController;
    vm.removeAnswerInput = removeAnswerInput;
    vm.showAllProblems = showAllProblems;
    vm.showNewQuestionForm = showNewQuestionForm;
    vm.showProblem = showProblem;
    vm.updateProblem = updateProblem;

    // initialize controller
    initController();

    // initialize properties
    vm.gridOptions = {
      paginationPageSizes: false,
      paginationPageSize: 10,
      enableFiltering: true,
      enableColumnMenus: false,
      columnDefs: getColumnDefs(),
      onRegisterApi: function (gridApi) {
        this.gridApi = gridApi;
      }
    }

    vm.show = {
      allProblems: true,
      problemForm: false,
      singleProblem: false
    };

    // define functions
    function initController() {
      vm.loading = true;
      vm.getProblems();
    }

    function getProblems() {
      Service.get('problems').then(function(response) {
        vm.problems = response;
        vm.gridOptions.data = vm.problems;
        vm.loading = false;
      });
    }

    function showAllProblems() {
      vm.show = {};
      vm.show.allProblems = true;
    }

    function showNewQuestionForm() {
      vm.show = {};
      vm.show.problemForm = true;
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

    function showProblem(id) {
      vm.show.singleProblem = true;
      Service.get('problems/'+id).then(function(response) {
        vm.problem = response;
      });
    }

    function editProblem(problem) {
      vm.show = {};
      vm.show.problemForm = true;
      Service.get('problems/'+problem.id).then(function(response) {
        vm.problem = response;
      });
    }

    function updateProblem() {
      if(vm.problemForm.$valid) {
        if(vm.problem.id) {
          Service.update('problems/'+vm.problem.id,vm.problem).then(function(response) {
            vm.problem.answers.forEach(function(ans) {
              if(ans.id) {
                Service.update('answers/'+ans.id,ans).then(function(r) {
                  vm.show = {};
                  vm.show.allProblems = true;
                  vm.initController();
                });
              } else {
                ans.problem_id = response.id;
                Service.post('answers/',ans).then(function(r) {
                  vm.show = {};
                  vm.show.allProblems = true;
                  vm.getProblems();
                });
              }
            });
          });
        } else {
          Service.post('problems/',vm.problem).then(function(response) {
            if(vm.problem.answers.length > 0) {
              vm.problem.answers.forEach(function(ans) {
                ans.problem_id = response.id;
                Service.post('answers/',ans).then(function(response) {
                  vm.show = {};
                  vm.show.allProblems = true;
                  vm.getProblems();
                });
              });
            } else {
              vm.show = {};
              vm.show.allProblems = true;
              vm.getProblems();
            }
          });
        }
      }
    }

    function deleteProblem(problem) {
      Service.delete('problems/'+problem.id).then(function(response) {
        // use map to get the deleted object from vm.problems by its id
        let deletedProblemIndex = vm.problems.map(function(prob) {
          return prob.id
        }).indexOf(problem.id);
        if(deletedProblemIndex > -1) {
          vm.problems.splice(deletedProblemIndex, 1);
        }
      });
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

    function getColumnDefs() {
      return [
        { field: 'statement', displayName: 'Statement', width: '70%', cellTemplate: getStatementCellTemplate('statement') },
        { field: 'created_at', displayName: 'Created', width: '30%', cellTemplate: getStatementCellTemplate('created_at'), sort: { direction: 'desc', priority: 0 } }
      ]
    }

    function getStatementCellTemplate(column) {
      if(column === 'statement') {
        return `<div class="ui-grid-cell-contents"><a class='problem-list-problem' ng-click="grid.appScope.vm.showProblem(row.entity.id)">{{grid.getCellValue(row, col)}}</a></div>`;
      } else if(column === 'created_at') {
        return `<div class="ui-grid-cell-contents">{{grid.getCellValue(row, col) | date:"MM/dd/yyyy 'at' h:mma" }}</div>`;
      }
    }

  }

})();
