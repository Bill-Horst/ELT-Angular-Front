(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('gameideasController', Controller);

  Controller.$inject = ['Service', '$state'];

  function Controller(Service, $state) {
    let vm = this;

    // properties
    vm.gameidea = {};
    vm.gameideas = [];
    vm.loading = false;
    vm.search = {};
    vm.show = {};
    vm.showSearchFields = false;
    vm.slider = {};

    // functions
    vm.clearSearchInput = clearSearchInput;
    vm.getGameideas = getGameideas;

    // initialize controller
    initController();

    // initialize properties
    vm.show = {
      allGameideas: true,
      gameideasForm: false,
      singleGameidea: false,
      advancedSearch: false
    }

    // define functions
    function initController() {
      vm.getGameideas();
      clearSearchInput();
    }

    function clearSearchInput() {
      vm.search.title = undefined;
      vm.search.time = null;
      vm.search.grade = null;
      vm.search.numberOfStudents = null;
      vm.search.materials = undefined;
    }

    function getGameideas() {
      vm.loading = true;
      Service.get('gameideas').then(function(response) {
        vm.gameideas = response;
        // combine columns to display min/max in single column
        vm.gameideas = combineColumns(vm.gameideas, 'mingradelevel', 'maxgradelevel', 'gradeLevelRange');
        vm.gameideas = combineColumns(vm.gameideas, 'mintime', 'maxtime', 'timeRange');
        vm.gameideas = combineColumns(vm.gameideas, 'minstudentcount', 'maxstudentcount', 'studentCountRange');
        // vm.gridOptions.data = vm.gameideas;
        vm.loading = false;
      }, function() {
        alert('Attempt failed');
        $state.go('home');
      });
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

  } // end of Controller
})();
