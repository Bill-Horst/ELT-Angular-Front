(function () {
  'use strict';

  angular
  .module('elt-app', ['ui.router', 'ui.grid', 'ui.bootstrap', 'ui.grid.pagination', 'rzModule'])
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
      controller: 'problemsController',
      controllerAs: 'vm',
      data: { activeTab: 'problems' }
    })
    .state('problem', {
      url: '/problem/:id',
      templateUrl: 'problems/show_problem.html',
      controller: 'showProblemController',
      controllerAs: 'vm',
      data: { activeTab: 'problems' }
    })
    .state('problem_form', {
      url: '/problem_form/:id',
      templateUrl: 'problems/problem_form.html',
      controller: 'problemFormController',
      controllerAs: 'vm',
      data: { activeTab: 'problems' }
    })
    .state('gameideas', {
      url: '/gameideas',
      templateUrl: 'gameideas/gameideas.html',
      controller: 'gameideasController',
      controllerAs: 'vm',
      data: { activeTab: 'gameideas' }
    })
    .state('gameidea', {
      url: '/gameidea/:id',
      templateUrl: 'gameideas/show_gameidea.html',
      controller: 'showGameideaController',
      controllerAs: 'vm',
      data: { activeTab: 'gameideas' }
    })
    .state('gameidea_form', {
      url: '/gameidea_form/:id',
      templateUrl: 'gameideas/gameidea_form.html',
      controller: 'gameideaFormController',
      controllerAs: 'vm',
      data: { activeTab: 'gameideas' }
    })
    .state('resources', {
      url: '/resources',
      templateUrl: 'resources/resources_home.html',
      controller: 'resourcesController',
      controllerAs: 'vm',
      data: { activeTab: 'resources' }
    })
    .state('blog', {
      url: '/blog',
      templateUrl: 'blog/blog_home.html',
      controller: 'blogController',
      controllerAs: 'vm',
      data: { activeTab: 'blog' }
    });
  }

  function run($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.activeTab = toState.data.activeTab;
    });
  }

})();
