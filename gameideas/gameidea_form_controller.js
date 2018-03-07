(function() {
  'use strict';

  angular
  .module('elt-app')
  .controller('gameideaFormController', Controller);

  Controller.$inject = ['Service', '$stateParams', '$state'];

  function Controller(Service, $stateParams, $state) {
    let vm = this;

    let params = $stateParams;

    // properties
    vm.gameidea = '';
    vm.slider = {};
    vm.gameBodyExists = false;
    vm.submitted = false;
    vm.showInvalidMessage = false;

    // functions
    vm.updateGameidea = updateGameidea;
    vm.goBack = goBack;

    // initialize controller
    initController();

    // initialize properties

    // define functions
    function updateGameidea() {

      vm.gameidea.body = (tinyMCE.get('game-body').getContent());
      console.log(vm.gameidea.body);

      if(vm.gameidea.body === "" || vm.gameidea.body === null || vm.gameidea.body === undefined ||
      vm.gameidea.materials === "" ||  vm.gameidea.materials === null || vm.gameidea.materials === undefined ||
      vm.gameidea.title === "" || vm.gameidea.title === null || vm.gameidea.title === undefined) {
        vm.showInvalidMessage = true;
      } else {
        acceptNewSliderValues();
        if(vm.gameideaForm.$valid) {
          if(vm.gameidea.id) {
            Service.update('gameideas/'+vm.gameidea.id,vm.gameidea).then(function(response) {
              $state.go('gameideas');
            }, function() {
              alert('Update failed');
              $state.go('gameideas');
            });
          } else {
            Service.post('gameideas/',vm.gameidea).then(function(response) {
              $state.go('gameideas');
            }, function() {
              alert('Save failed');
              $state.go('gameideas');
            });
          }
        }
      }
    }

    function goBack() {
      $state.go('gameidea', {id: params.id});
    }

    // private
    function initController() {
      if(params.id) {
        Service.get('gameideas/'+params.id).then(function(response) {
          vm.gameidea = response;
          vm.slider.gradeLevel = getSliderValues('gradeLevel');
          vm.slider.duration = getSliderValues('duration');
          vm.slider.studentCount = getSliderValues('studentCount');
          setTimeout(function() {
            tinymce.get('game-body').setContent(vm.gameidea.body);
          }, 100);
        }, function() {
          alert('Attempt failed: going back to game idea screen');
          $state.go('gameideas');
        });
      } else {
        vm.gameidea = {};
        vm.slider.gradeLevel = getSliderValues('gradeLevel');
        vm.slider.duration = getSliderValues('duration');
        vm.slider.studentCount = getSliderValues('studentCount');
      }
    }

    function getSliderValues(slider) {
      if(slider === 'gradeLevel') {
        return {
          minValue: vm.gameidea.mingradelevel ? vm.gameidea.mingradelevel : 3,
          maxValue: vm.gameidea.mingradelevel ? vm.gameidea.maxgradelevel : 7,
          options: {
            floor: 1,
            ceil: 12
          }
        };
      } else if (slider === 'duration') {
        return {
          minValue: vm.gameidea.mintime ? vm.gameidea.mintime : 10,
          maxValue: vm.gameidea.maxtime ? vm.gameidea.maxtime : 30,
          options: {
            floor: 1,
            ceil: 60
          }
        };
      } else if (slider === 'studentCount') {
        return {
          minValue: vm.gameidea.minstudentcount ? vm.gameidea.minstudentcount : 1,
          maxValue: vm.gameidea.maxstudentcount ? vm.gameidea.maxstudentcount : 40,
          options: {
            floor: 1,
            ceil: 40
          }
        };
      }
    }

    function acceptNewSliderValues() {
      vm.gameidea.mingradelevel = vm.slider.gradeLevel.minValue;
      vm.gameidea.maxgradelevel = vm.slider.gradeLevel.maxValue;
      vm.gameidea.minstudentcount = vm.slider.studentCount.minValue;
      vm.gameidea.maxstudentcount = vm.slider.studentCount.maxValue;
      vm.gameidea.mintime = vm.slider.duration.minValue;
      vm.gameidea.maxtime = vm.slider.duration.maxValue;
    }

  } // end of controller function
})();
