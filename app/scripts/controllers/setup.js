'use strict';

angular.module('wearscriptPlaygroundApp')
  .controller('SetupCtrl', function ($scope,$http,Profile, $modalInstance, Editor) {
    $scope.wsurl = '';
    $scope.adb = '';
    $scope.imageHeight = '0px'
    $scope.settings = {};
    $scope.settings.vimMode = Profile.get('vimMode');
    $scope.changeVimMode = function(){
      Profile.set('vimMode', $scope.settings.vimMode)
      Profile.vimMode = $scope.settings.vimMode
      if($scope.settings.vimMode === true)
        Editor.editor.setKeyboardHandler("ace/keyboard/vim")
      else
        Editor.editor.setKeyboardHandler("")
    }

    $scope.settings.debugMode = Profile.get("debugMode");
    $scope.changeDebugMode = function(){
      Profile.set('debugMode', $scope.settings.debugMode);
      Profile.debugMode = $scope.settings.debugMode;
    }

    $scope.pullFromLocalStorage = Profile.get('pullFromLocalStorage');
    $scope.changeLocalStorage = function(){
      Profile.set('pullFromLocalStorage', $scope.pullFromLocalStorage);
    }

    if( window.innerWidth < 400){
      $scope.imageHeight = '250px';
    } else {
      $scope.imageHeight = '500px';
    }


    var wsurl = WSURL + "/ws/" + $scope.wskey;
    $scope.wsurl = wsurl;
    $scope.adb = 'adb shell \"mkdir -p /sdcard/wearscript && echo \'' + wsurl + '\' > /sdcard/wearscript/qr.txt\"'

    $scope.ok = function () {
      $modalInstance.dismiss('cancel');
    };
  }
);
