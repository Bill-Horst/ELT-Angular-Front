(function () {
  'use strict';

  angular
  .module('elt-app', ['ui.router','ui.grid','ui.bootstrap','ui.grid.pagination'])
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
  }



})();
