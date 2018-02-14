(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('gameideasController', Controller);

  Controller.$inject = ['Service'];

  function Controller(Service) {
    let vm = this;

    // properties
    vm.gameidea = {};
    vm.gameideas = [];
    vm.loading = false;
    vm.show = {};
    vm.slider = {};

    vm.search = {};
    vm.search.time = null;
    vm.search.grade = null;
    vm.search.numberOfStudents = null;


    // functions
    vm.editGameidea = editGameidea;
    vm.getGameideas = getGameideas;
    vm.showAllGameideas = showAllGameideas;
    vm.showGameidea = showGameidea;
    vm.updateGameidea = updateGameidea;

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
      singleGameidea: false,
      advancedSearch: false
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
      });
    }

    function showAllGameideas() {
      vm.show = {};
      vm.show.allGameideas = true;
    }

    function showGameidea(id) {
      vm.show = {};
      vm.show.singleGameidea = true;
      if(id) {
        Service.get('gameideas/'+id).then(function(response) {
          vm.gameidea = response;
          console.log(vm.gameidea);
        });
      }
    }

    function editGameidea(gameidea) {
      vm.show = {};
      vm.show.gameideasForm = true;
      vm.slider.gradeLevel = getSliderValues('gradeLevel');
      vm.slider.duration = getSliderValues('duration');
      vm.slider.studentCount = getSliderValues('studentCount');
    }

    function updateGameidea() {
      acceptNewSliderValues();
      if(vm.gameideaForm.$valid) {
        if(vm.gameidea.id) { // if edit (vm.gameidea already existed)
          Service.update('gameideas/'+vm.gameidea.id,vm.gameidea).then(function(response) {
            // in future, update tags here
            console.log('update to: ');
            console.log(response);
            // vm.gameideas.push(response);
            // TODO: map the vm.gameideas array and replace old
            // TODO: gameidea with response by id
          });
        } else {
          Service.post('gameideas/'+vm.gameidea).then(function(response) {
            console.log('created new game: '+response)
          });
        }
      }
    }

    // Private functions
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

    function getSliderValues(slider) {
      if(slider === 'gradeLevel') {
        return {
          minValue: vm.gameidea.mingradelevel,
          maxValue: vm.gameidea.maxgradelevel,
          options: {
            floor: 1,
            ceil: 12
          }
        };
      } else if (slider === 'duration') {
        return {
          minValue: vm.gameidea.mintime,
          maxValue: vm.gameidea.maxtime,
          options: {
            floor: 1,
            ceil: 60
          }
        };
      } else if (slider === 'studentCount') {
        return {
          minValue: vm.gameidea.minstudentcount,
          maxValue: vm.gameidea.maxstudentcount,
          options: {
            floor: 1,
            ceil: 40
          }
        };
      }
    }



    function getColumnDefs() {
      return [
        { field: 'title', displayName: 'Game', width: '20%', enableFiltering: true, cellTemplate: getGameideaCellTemplate('title') },
        { field: 'body', displayName: 'Intro', width: '35%', enableFiltering: false },
        { field: 'gradeLevelRange', displayName: 'Grades', width: '10%', enableFiltering: false },
        { field: 'studentCountRange', displayName: 'Students', width: '10%', enableFiltering: false },
        { field: 'timeRange', displayName: 'Duration', width: '10%', enableFiltering: false },
        { field: 'materials', displayName: 'Materials', width: '15%', enableFiltering: true }
      ]
    }

    function getGameideaCellTemplate(column) {
      if(column === 'title') {
        return `<div class="ui-grid-cell-contents"><a class='gameideas-list-gameideas' ui-sref='gameidea({id: row.entity.id})'>{{grid.getCellValue(row, col)}}</a></div>`;
      }
    }

  } // end of Controller
})();
