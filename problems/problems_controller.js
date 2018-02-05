(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('problemsController', Controller);

  Controller.$inject = ['Service'];

  function Controller(Service) {
    let vm = this;

    // properties
    vm.gridOptions = {};
    vm.loading = false;
    vm.problems = [];
    vm.show = {};

    // functions
    vm.getProblems = getProblems;
    vm.initController = initController;

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

    // define functions
    function getProblems() {
      vm.show.allProblems = true;
      Service.get('problems').then(function(response) {
        vm.problems = response;
        vm.gridOptions.data = vm.problems;
        vm.loading = false;
      });
    }

    // function showNewQuestionForm() {
    //   vm.problem = {};
    //   vm.show = {};
    //   vm.show.newProblem = true;
    //   vm.problem.answers = [
    //     {
    //       statement: '',
    //       problem_id: -1,
    //       correct: false
    //     },
    //     {
    //       statement: '',
    //       problem_id: -1,
    //       correct: false
    //     }
    //   ];
    // }

    // private
    function initController() {
      vm.show = {
        allProblems: true,
        newProblem: false
      };
      vm.loading = true;
      vm.getProblems();
    }

    function getColumnDefs() {
      return [
        { field: 'statement', displayName: 'Statement', width: '70%', cellTemplate: getProblemCellTemplate('statement') },
        { field: 'created_at', displayName: 'Created', width: '30%', cellTemplate: getProblemCellTemplate('created_at'), sort: { direction: 'desc', priority: 0 } }
      ]
    }

    function getProblemCellTemplate(column) {
      if(column === 'statement') {
        return `<div class="ui-grid-cell-contents"><a class='problem-list-problem' ng-click="grid.appScope.vm.showProblem(row.entity.id)" ui-sref="problem({id: row.entity.id})">{{grid.getCellValue(row, col)}}</a></div>`;
      } else if(column === 'created_at') {
        return `<div class="ui-grid-cell-contents">{{grid.getCellValue(row, col) | date:"MM/dd/yyyy 'at' h:mma" }}</div>`;
      }
    }

  }

})();
