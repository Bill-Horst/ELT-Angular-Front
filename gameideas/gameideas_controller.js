(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('gameideasController', Controller);

  Controller.$inject = ['Service'];

  function Controller(Service) {
    let vm = this;

    // properties
    vm.gameideas = [];
    vm.loading = false;
    vm.show = {};

    // functions
    vm.getGameideas = getGameideas;

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
      allGameideas: true,
      gameideasForm: false,
      singleGameidea: false
    }

    // define functions
    function initController() {
      vm.loading = true;
      vm.getGameideas();
    }

    function getGameideas() {
      Service.get('gameideas').then(function(response) {
        vm.gameideas = response;
        // combine columns to display min/max in single column
        vm.gameideas = combineColumns(vm.gameideas, 'mingradelevel', 'maxgradelevel', 'gradeLevelRange');
        vm.gameideas = combineColumns(vm.gameideas, 'mintime', 'maxtime', 'timeRange');
        vm.gameideas = combineColumns(vm.gameideas, 'minstudentcount', 'maxstudentcount', 'studentCountRange');

        vm.gridOptions.data = vm.gameideas;
        vm.loading = false;
        console.log(response);
      });
    }

    function combineColumns(object, lower, upper, newColumnName) {
      angular.forEach(object, function(game, index) {
        let range = '';
        for(let prop in game) {
          if(prop === lower) {
            range += game[prop];
          }
          if(prop === upper) {
            range += ' - ' + game[prop];
          }
        }
        if(lower === upper) {
          object[index][newColumnName] = lower;
        } else {
          object[index][newColumnName] = range;
        }
      });
      return object;
    }

    function getColumnDefs() {
      return [
        { field: 'title', displayName: 'Game', width: '20%' },
        { field: 'body', displayName: 'Intro', width: '35%' },
        { field: 'gradeLevelRange', displayName: 'Grades', width: '10%' },
        { field: 'studentCountRange', displayName: 'Students', width: '10%' },
        { field: 'timeRange', displayName: 'Duration', width: '10%' },
        { field: 'materials', displayName: 'Materials', width: '15%' }

      ]
    }

  } // end of Controller
})();
