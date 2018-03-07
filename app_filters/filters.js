(function() {
  'use strict';

  angular
  .module('elt-app')
  .filter('filterHTMLTags', filterHTMLTags)
  .filter('filterNBSP', filterNBSP)
  .filter('lessThan', lessThan)
  .filter('greaterThan', greaterThan);

  function filterHTMLTags() {
    return function (text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }

  function filterNBSP() {
    return function(text) {
      return text ? String(text).replace(/&nbsp;/g, '') : '';
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
