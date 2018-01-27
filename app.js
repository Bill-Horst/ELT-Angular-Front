(function () {
  'use strict';

  angular
  .module('elt-app', ['ui.router'])
  .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'homeController',
      controllerAs: 'vm',
      data: {activeTab: 'home'}
    })
    .state('problems', {
      url: '/problems',
      templateUrl: 'problems/problems.html',
      controller: 'problemController',
      controllerAs: 'vm',
      data: {activeTab: 'problems'}
    });
    // .state('problem', {
    //   url: '/problems/{id}',
    //   templateUrl: 'problems/show_problem.html',
    //   controller: 'problemController',
    //   controllerAs: 'vm'
    // });
  }



})();
