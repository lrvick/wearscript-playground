'use strict';

angular.module('wearscriptPlaygroundApp')
  .controller('AppCtrl', function ($scope, createDialog) {
    $scope.openHelp = function(){
      createDialog('views/modal/help.html',
        { title: 'Need Help?'
        }
      );
    }
  });
