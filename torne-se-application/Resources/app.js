// Notifications

if (Ti.Platform.osname == "iphone"){
  Titanium.Network.registerForPushNotifications({
    types:[
    Titanium.Network.NOTIFICATION_TYPE_BADGE,
    Titanium.Network.NOTIFICATION_TYPE_ALERT,
    Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
    success: successCallback,
    error: errorCallback,
    callback: messageCallback
  });

  function successCallback(e) {
    var request = Titanium.Network.createHTTPClient({
       onload: function(e) {
         if (request.status != 200 && request.status != 201) {
           request.onerror(e);
           return;
          }
       },
       onerror: function(e) {
         Ti.API.info("Push Notifications registration with Parse failed. Error: " + e.error);
       }
    });

    var params = {
      'deviceType': 'ios',
      'deviceToken': e.deviceToken,
      'channels': ['']
    };

   // Register device token with Parse
   request.open('POST', 'https://api.parse.com/1/installations', true);
   request.setRequestHeader('X-Parse-Application-Id', '8IXHdO6ZYggCxTUZURo6aTdUFqUe30DOqbZOpLLm');
   request.setRequestHeader('X-Parse-REST-API-Key', 'XouOhwa7l2XWsDak9QzjEMdaDKwIvQMnPrkHK8Wz');
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify(params));
 }

  // error callBack
  function errorCallback(e) {
   Ti.API.info("Error during registration: " + e.error);
 }

  // message callBack
  function messageCallback(e) {
  //// this if we want to show the notification when the app is open
  //  var message;
  //
  //  if (e['data']['aps'] != undefined) {
  //    if (e['data']['aps']['alert'] != undefined) {
  //      if (e['data']['aps']['alert']['body'] != undefined) {
  //        message = e['data']['aps']['alert']['body'];
  //      } else {
  //        message = e['data']['aps']['alert'];
  //      }
  //    } else {
  //      message = 'No Alert content';
  //    }
  //  } else {
  //    message = 'No APS content';
  //  }
  //  alert(message);
}
} else {
  var Cloud = require('ti.cloud');
  var CloudPush = require('ti.cloudpush');

  CloudPush.debug = true;
  CloudPush.showTrayNotificationsWhenFocused = true;
  CloudPush.focusAppOnPush = false;

  var deviceToken = null;

  // Initialize the module
  CloudPush.retrieveDeviceToken({
    success: deviceTokenSuccess,
    error: deviceTokenError
  });

  function loginCloudUser(){
    Cloud.Users.login({
      login: 'didox@example.com',
      password: 'didox'
    }, function (e) {
      if (e.success) {
        Cloud.PushNotifications.subscribe({
          channel: 'alert',
          device_token: deviceToken,
          type: 'gcm'
        }, function (e) {
          if (e.success) {
            Ti.API.info('Subscribed for Push Notification!');
          } else {
            Ti.API.info('Subscribe error:' + ((e.error && e.message) || JSON.stringify(e)));
          }
        });

      } else {
        Ti.API.info('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
      }
    });
  }
  // Save the device token for subsequent API calls
  function deviceTokenSuccess(e) {
    deviceToken = e.deviceToken;
    loginCloudUser();
  }
  function deviceTokenError(e) {
    Ti.API.info('Failed to register for push notifications! ' + e.error);
  }
  // Process incoming push notifications
  CloudPush.addEventListener('callback', function (evt) {
    Ti.API.info(evt.payload);
  });
  // Triggered when the push notifications is in the tray when the app is not running
  CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
    Ti.API.info('Tray Click Launched App (app was not running)');
  });
  // Triggered when the push notifications is in the tray when the app is running
  CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
    Ti.API.info('Tray Click Focused App (app was already running)');
  });
}
// END NOTIFICATIONS

var conexao = true;
// var eventExecute = (Ti.Platform.osname == "iphone" ? "load" : "beforeload");

function createWindow(exitOnClose){
  var winConfig = "";
  if (Ti.Platform.osname == "iphone"){
    winConfig = Ti.UI.createWindow({
      title: 'Torne-se um programador',
      selectedBackgroundColor: '#000',
      statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
      exitOnClose: exitOnClose,
      fullscreen: false,
      modal: true,
      navBarHidden: true,
      statusBarHidden: true,
      backgroundColor: '#333'
    });
  } else {
    winConfig = Ti.UI.createWindow({
      title: 'Torne-se um programador',
      selectedBackgroundColor: '#000',
      exitOnClose: exitOnClose,
      fullscreen: false,
      modal: true,
      navBarHidden: true,
      statusBarHidden: true,
      backgroundColor: '#333'
    });
  };

  if (Ti.Platform.osname == 'android'){
    winConfig.addEventListener('open', function(e) {
        winConfig.activity.actionBar.hide();
    });
  }

  return winConfig;
}

var win = createWindow(true);

win.addEventListener('android:back',function(e){
  var dialog = Ti.UI.createAlertDialog({
    buttonNames: ['Sim', 'Não'],
    message: 'Você sairá do aplicativo. Deseja continuar?'
  });
  dialog.addEventListener('click', function(e){
    if (e.index === 0){
      win.close();
      Titanium.Android.currentActivity.finish();
    }
  });
  dialog.show();
});

var webview = Ti.UI.createWebView({
  title: 'Torne-se um programador',
  url: 'index.html',
  willHandleTouches:false,
  enableZoomControls:false,
  backgroundColor: '#333'
});

webview.addEventListener('load', function() {
  var url = webview.getUrl();
  if(url.indexOf("http://") != -1){
    webview.goBack();
    Ti.Platform.openURL(url);
  }
});

if (Ti.Platform.osname == 'android'){
  Ti.Gesture.addEventListener('orientationchange', function(e) {
    Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
  });
}

win.add(webview);
win.open();

var openURL = function(url, message) {
  if(message == undefined) message = 'Você sairá do aplicativo. Deseja continuar?';
  var confirm = Titanium.UI.createAlertDialog({
    message: message,
    buttonNames: ['Sim', 'Não']
  });
  confirm.show();
  confirm.addEventListener('click', function(e){
    if(e.index === 0){
      try{
        Ti.Platform.openURL(url);
      }
      catch(err){
        alert(err.message);
      }
    }
  });
}

Ti.App.addEventListener('openUrl', function(e) {
  var url = e.url;
  var message = e.message;
  openURL(url, message);
});

Ti.App.addEventListener('openWindow', function(e) {
  try{
    openWindow(e.url);
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('closeWindow', function(e) {
  try{
    closeWindow();
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('backToHome', function(e) {
  try{
    backToHome();
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('openVideo', function(e) {
  try{
    playVideo(e.url);
  }
  catch(e){
    alert(e.message);
  }
});

Ti.App.addEventListener('networkOffAlert', function(e) {
  try{
    networkOffAlert();
  }
  catch(e){
    alert(e.message);
  }
});


Ti.App.addEventListener('messageForUser', function(e) {
  try{
    messageForUser(e.message);
  }
  catch(e){
    alert(e.message);
  }
});

var messageForUser = function(message){
  Ti.UI.createAlertDialog({
    message: message,
    ok: 'Ok',
    title: 'Recado para o programador'
  }).show();
};

var networkOffAlert = function(){
  if(!Titanium.Network.online){
    if(!conexao) return;
    conexao = false;
    webview.evalJS("conectado = false");
    Ti.UI.createAlertDialog({
      message: 'Você está sem conexão de internet',
      ok: 'Ok',
      title: 'Sem conexão'
    }).show();
    return;
  }
  conexao = true;
  webview.evalJS("conectado = true");
};


var currentWindow = [];
var closeWindow = function(){
  if(currentWindow.length > 0 != null){
    var winClose = currentWindow.pop();
    if(winClose != undefined && winClose != null){
      winClose.close();
    }
  }
}

var backToHome = function(){
  while(currentWindow.length > 0){
    var winClose = currentWindow.pop();
    if(winClose != undefined && winClose != null){
      setTimeout(function(){
        winClose.close();
      },200);
    }
  }
}

var webViews = [];

var openWindow = function(url){
  try{
    var vidWin = createWindow(false);
    vidWin.addEventListener('android:back',function(e){ vidWin.close(); });
    var urlWebView = (Ti.Platform.osname === "iphone" ? 'blank.html' : url); // fix bug iphone
    var webviewInternal = Ti.UI.createWebView({
      title: 'Torne-se um programador',
      url: urlWebView,
      willHandleTouches:false,
      enableZoomControls:false,
      backgroundColor: '#333'
    });

    webviewInternal.addEventListener('load', function() {
      var internaUrl = webviewInternal.getUrl();

      if(internaUrl.indexOf("blank.html") != -1){ // fix bug iphone
        webviewInternal.evalJS('window.location.href="'+ url +'"');
      }

      if(internaUrl.indexOf("http://") != -1){
        webviewInternal.goBack();
        Ti.Platform.openURL(internaUrl);
      }
    });

    webViews.push(webviewInternal);

    vidWin.add(webviewInternal);
    vidWin.open();
    currentWindow.push(vidWin);
  }
  catch(e){
    alert(e.message);
  }
};

var playVideo = function(url){
  try{
    if(Ti.Platform.osname === "iphone" && url.indexOf("youtube") === -1){
      var closeButton = Ti.UI.createButton({
        title:"FECHAR",
        top:"0dp",
        right:"10dp",
        backgroundColor:"#fff",
        width:"70dp",
        height:"30dp",
        borderRadius:"5",
        color:"#000",
        opacity:"0.6"
      });
      closeButton.font = {fontWeight:"bold"};

      closeButton.addEventListener('click', function() {
        videoPlayer.hide();
        videoPlayer.release();
        videoPlayer = null;
        vidWin.close();
      });

      var vidWin = Titanium.UI.createWindow({
        backgroundColor:'#000',
        exitOnClose: true,
        fullscreen: true,
        modal: true,
        navBarHidden: true,
        statusBarHidden: true
      });

      var videoPlayer = Titanium.Media.createVideoPlayer({
        url:url,
        autoplay:true,
        fullscreen:false,
        backgroundColor:'#000',
        mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
        scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FIT
      });

      vidWin.add(videoPlayer);
      vidWin.add(closeButton);
      vidWin.open();
    }
    else{
      Ti.Platform.openURL(url);
    }
  }
  catch(e){
    alert(e.message);
  }
};

// var urlVerifyVersion = 'http://cm.api.vejasp.abril.com.br/verify/';
// var urlVerify = urlVerifyVersion + Ti.App.version;
// var xhr = Ti.Network.createHTTPClient({
//   onload: function() {
//     try{
//       json = JSON.parse(this.responseText);
//       if (json && json.message.length) {
//         var dialog = Ti.UI.createAlertDialog({
//           buttonNames: ['Sim', 'Não'],
//           message: json.message + '\n\nDeseja atualizar agora?'
//         });
//         dialog.addEventListener('click', function(e){
//           if (e.index === 0){
//             if (Ti.Platform.osname == 'android'){
//               Ti.Platform.openURL("https://play.google.com/store/apps/details?id=com.didox.torne-se");
//             }
//             else{
//               Ti.Platform.openURL("https://itunes.apple.com/br/app/veja-sao-paulo/id370195473?mt=8");
//             }
//           }
//         });
//         dialog.show();
//       }
//     }
//     catch(e){}
//   }
// });
// xhr.open('GET', urlVerify);
// xhr.send();