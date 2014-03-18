'use strict';

angular.module('wearscriptPlaygroundApp')
  .controller('WeariverseCtrl', function ($scope, Profile, Socket, $rootScope, $log) {
    $rootScope.$on('connected', function(){
      function gistList(channel, gists) {
        if (typeof gists == 'object') {
          for (var i = 0; i < gists.length; i++)
            gists[i].url_playground = '#/gist/' + gists[i].id;
          Profile.set("gists", gists)
          $scope.gists = Profile.gists
          $scope.$apply()
        }
      }
      var ws = Socket.ws;
      var channel = ws.channel(ws.groupDevice, 'gistList');
      ws.publish_retry(gistList.bind(this), 1000, channel, 'gist', 'list', channel);
    })
    $scope.gists = Profile.get('gists')
  });
