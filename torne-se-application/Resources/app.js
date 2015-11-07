var conexao = true;

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
  win.close();
  Titanium.Android.currentActivity.finish();
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
  if(message == undefined){
    Ti.Platform.openURL(url);
    return;
  }

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
    messageForUser(e.message, e.confirm, e.url, e.openURL);
  }
  catch(e){
    alert(e.message);
  }
});

var messageForUser = function(message, confirm, url, goOpenUrl){
  if(confirm){
    var dialog = Ti.UI.createAlertDialog({
      buttonNames: ['Sim', 'Não'],
      message: message,
      title: 'Recado para o programador'
    });
    dialog.addEventListener('click', function(e){
      if (e.index === 0){
        if(goOpenUrl){
          openURL(url)
        }
        else{
          openWindow(url);
        }
      }
    });
    dialog.show();
  }
  else{
    Ti.UI.createAlertDialog({
      message: message,
      ok: 'Ok',
      title: 'Recado para o programador'
    }).show();
  }
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

//================================== push notification =================================
try{
  if (Ti.Platform.osname == 'android'){
    var CloudPush = require('ti.cloudpush');
    CloudPush.debug = true;
    CloudPush.enabled = true;
    CloudPush.showTrayNotificationsWhenFocused = true;
    CloudPush.focusAppOnPush = false;

    var deviceToken;
    var Cloud = require('ti.cloud');
    Cloud.debug = true;

    CloudPush.retrieveDeviceToken({
      success: function deviceTokenSuccess(e) {
        //alert('Device Token: ' + e.deviceToken);
        deviceToken = e.deviceToken
        createUser();
      },
      error: function deviceTokenError(e) {
        //alert('Failed to register for push! ' + e.error);
      }
    });

    function createUser(){
      Cloud.Users.create({
        username: 'aluno-' + Titanium.Platform.id,
        password: 'torne-se',
        password_confirmation: 'torne-se'
       }, 
       function (e) {
        if (e.success) {
          loginDefault();
          // alert('You are now logged in as ' + e.users[0].username);
        } else {
          loginDefault();
          //alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
      });
    }

    function loginDefault(e){
      //Create a Default User in Cloud Console, and login
      Cloud.Users.login({
          login: 'aluno-' + Titanium.Platform.id,
          password: 'torne-se'
      }, function (e) {
          if (e.success) {
            //alert("login success");
            defaultSubscribe();
          } else {
            //alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
          }
      });
    }

    function defaultSubscribe(){
      Cloud.PushNotifications.subscribe({
        channel: 'Projeto torne-se um programador',
        device_token: deviceToken,
        type: 'android'
      }, function (e){
        if (e.success) {
          //alert('Subscribed for Push Notification!');
        }else{
          //alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
        }
      });
    }
  }
}
catch(e){
  alert('Error ao criar notification: ' + e.message);
}
//================================== push notification =================================
