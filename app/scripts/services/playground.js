'se strict';

angular.module('wearscriptPlaygroundApp')
  .service('Playground', function Playground( $window, $location, Socket) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {};

    service.redirectAuthGoogle = function() {
      $location.replace('auth');
    }

    serviceredirectAuthGithub = function() {
      $location.replace('authgh');
    }

    service.redirectSignout = function() {
      $location.replace("signout");
    }

    service.createKey = function(type, success, error) {
      var xhr = $.ajax({url: 'user/key/' + type, type: 'POST', success: success});
      if (!_.isUndefined(error)) {
        xhr.error(error);
        }
    }

    service.createQR = function(WSUrl, success, error) {
        createKey("ws", function (secret) {success("https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=" + WSUrl + "/ws/" + secret + "&chld=H|4&choe=UTF-8")}, error);
    }

    service.runScriptOnGlass = function(ws, script) {
      ws.publish('glass', 'script', {'glass.html': script});
    }

    service.runLambdaOnGlass = function(ws, script) {
      ws.publish('glass', 'lambda', script);
    }

    service.runEditorScriptOnGlass = function() {
      runScriptOnGlass(HACK_WS, window.HACK_EDITOR.getSession().getValue());
    }

    window.HACK_runLambdaOnGlass = function(line) {
      runLambdaOnGlass(HACK_WS, line);
    }

    service.gistGet = function(ws, gistid, callback) {
      ws.subscribe(ws.channel(ws.groupDevice, 'gistGet'), callback);
      ws.publish('gist', 'get', ws.channel(ws.groupDevice, 'gistGet'), gistid);
    }

    service.gistModify = function(ws, gistid, fileName, content, callback) {
      var c = ws.channel(ws.groupDevice, 'gistModify');
      ws.subscribe(c, callback);
      var files = {};
      files[fileName] = {content: content};
      ws.publish('gist', 'modify', c, gistid, undefined, files);
    }

    service.gistCreate = function(ws, secret, description, fileName, content, callback) {
      var c = ws.channel(ws.groupDevice, 'gistCreate');
      ws.subscribe(c, callback);
      var files = {};
      files[fileName] = {content: content};
      ws.publish('gist', 'create', c, secret, description, files);
    }
  });
