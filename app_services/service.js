(function() {
  'use strict';

  angular
  .module('elt-app')
  .factory('Service', Service);

  function Service($http, $q) {

    let service = {};
    let baseUrl = 'localhost:3000/';

    service.get = get;
    service.post = post;
    // service.update = update;
    service.delete = destroy;

    return service;

    function get(path) {
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/' + path
        }).then(handleSuccess, handleError);
    }

    function post(path, object) {
        return $http({
          method: 'POST',
          url: 'http://localhost:3000/' + path,
          data: object
        }).then(handleSuccess, handleError);
    }

    // function update(path) {
    //     return $http({
    //       method: 'PUT',
    //       url: 'http://localhost:3000/' + path
    //     }).then(handleSuccess, handleError);
    // }

    function destroy(path) {
        return $http({
          method: 'DELETE',
          url: 'http://localhost:3000/' + path
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

// public get(path) {
//   var endpoint = this.API_URL + path;
//   return this.http.get(endpoint);
// }
//
// public post(path:string,body:any) {
//   var endpoint = this.API_URL + path;
//   return this.http.post(endpoint,body);
// }
//
// public delete(path:string){
//   var endpoint = this.API_URL + path;
//   return this.http.delete(endpoint);
// }
//
// public update(path:string, body:any){
//   var endpoint = this.API_URL + path;
//   return this.http.put(endpoint,body);
// }
