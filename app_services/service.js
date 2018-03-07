(function() {
  'use strict';

  angular
  .module('elt-app')
  .factory('Service', Service);

  Service.$inject = ['$http', '$q'];

  function Service($http, $q) {

    let baseUrl = '';
    let service = {};
    if (deployedOnAWS) {
      baseUrl = 'https://frozen-sierra-32417.herokuapp.com/';
    } else {
      baseUrl = 'http://localhost:3000/';
        // baseUrl = 'https://frozen-sierra-32417.herokuapp.com/';
    }

    service.get = get;
    service.post = post;
    service.update = update;
    service.delete = destroy;

    return service;

    function get(path) {
      return $http({
        method: 'GET',
        url: baseUrl + path
      }).then(handleSuccess, handleError);
    }

    function post(path, object) {
      return $http({
        method: 'POST',
        url: baseUrl + path,
        data: object
      }).then(handleSuccess, handleError);
    }

    function update(path, object) {
      return $http({
        method: 'PUT',
        url: baseUrl + path,
        data: object
      }).then(handleSuccess, handleError);
    }

    function destroy(path) {
      return $http({
        method: 'DELETE',
        url: baseUrl + path
      }).then(handleSuccess, handleError);
    }

    function handleSuccess(response) {
      return $q.resolve(response.data);
    }

    function handleError(response) {
      return $q.reject(response.data);
    }
  }

})();
