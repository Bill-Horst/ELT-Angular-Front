(function () {
  'use strict';

  angular
  .module('elt-app', ['ui.router', 'ui.grid', 'ui.bootstrap', 'ui.grid.pagination', 'rzModule'])
  .config(config)
  .filter('filterHTMLTags', filterHTMLTags)
  .filter('lessThan', lessThan)
  .filter('greaterThan', greaterThan)
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

  function filterHTMLTags() {
    return function (text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }

  function lessThan() {
    return function(items, values) {
      let filtered = [];
      for(let v in values) {
        for(let i = 0; i < items.length; i++) {
          if(values[v] <= items[i][v] || values[v] === null) {
            filtered.push(items[i]);
          }
        }
      }
      return filtered;
    }
  }

  function greaterThan() {
    return function(items, values) {
      let filtered = [];
      for(let v in values) {
        for(let i = 0; i < items.length; i++) {
          if(values[v] >= items[i][v] || values[v] === null) {
            filtered.push(items[i]);
          }
        }
      }
      return filtered;
    }
  }



})();
