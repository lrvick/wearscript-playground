'use strict';

angular.module('wearscriptPlaygroundApp')

  .factory( 'Profile', function( Storage, $rootScope ){

    var profile = {
      authenticated: false,
      complete: false,
      github_user: false,
      google_user: false,
      glass_id: false,
      vimMode: Storage.get('vimMode') || false,
      debugMode: Storage.get('debugMode') || false,
      pullFromLocalStorage: Storage.get('pullFromLocalStorage') || false,
      menu: Storage.get('menu') || true,
      set: function(key, val) {
        this[key] = val;
        Storage.set(key, val);
      },
      get: function(key) {
        return this[key] || Storage.get(key);
      },
      toggle: function(key) {
        this[key] = !this[key];
        Storage.set(key,this[key]);
        return this[key];
      }
    }

    return profile

  })
