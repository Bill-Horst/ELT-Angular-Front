(function () {
  'use strict';

  angular
  .module('elt-app', ['ui.router','ui.grid','ui.bootstrap','ui.grid.pagination'])
  .config(config)
  .run(run);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'homeController',
      controllerAs: 'vm',
      data: { activeTab: 'home' }
    })
    .state('problems', {
      url: '/problems',
      templateUrl: 'problems/problems.html',
      controller: 'problemController',
      controllerAs: 'vm',
      data: { activeTab: 'problems' }
    })
    .state('gameideas', {
      url: '/gameideas',
      templateUrl: 'gameideas/gameideas.html',
      controller: 'gameideasController',
      controllerAs: 'vm',
      data: { activeTab: 'gameideas' }
    });
  }

  function run($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.activeTab = toState.data.activeTab;
    });
  }



})();
