var utils = {}

utils.conexao = true;

utils.createWindow = function(exitOnClose){
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

utils.openURL = function(url, message) {
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

utils.messageForUser = function(message, confirm, url, goOpenUrl){
  if(confirm){
    var dialog = Ti.UI.createAlertDialog({
      buttonNames: ['Sim', 'Não'],
      message: message,
      title: 'Recado para o programador'
    });
    dialog.addEventListener('click', function(e){
      if (e.index === 0){
        if(goOpenUrl){
          utils.openURL(url)
        }
        else{
          utils.openWindow(url);
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

utils.networkOffAlert = function(){
  if(!Titanium.Network.online){
    if(!utils.conexao) return;
    utils.conexao = false;
    application.webview.evalJS("conectado = false");
    Ti.UI.createAlertDialog({
      message: 'Você está sem conexão de internet',
      ok: 'Ok',
      title: 'Sem conexão'
    }).show();
    return;
  }
  utils.conexao = true;
  application.webview.evalJS("conectado = true");
};

utils.currentWindow = [];
utils.closeWindow = function(){
  if(utils.currentWindow.length > 0 != null){
    var winClose = utils.currentWindow.pop();
    if(winClose != undefined && winClose != null){
      winClose.close();
    }
  }
}

utils.backToHome = function(){
  while(utils.currentWindow.length > 0){
    var winClose = utils.currentWindow.pop();
    if(winClose != undefined && winClose != null){
      setTimeout(function(){
        winClose.close();
      },200);
    }
  }
}

utils.webViews = [];
utils.openWindow = function(url){
  try{
    var vidWin = utils.createWindow(false);
    vidWin.addEventListener('android:back',function(e){ vidWin.close(); });
    var urlWebView = (Ti.Platform.osname === "iphone" ? 'HTML/blank.html' : '../HTML/' + url); // fix bug iphone
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

    utils.webViews.push(webviewInternal);

    vidWin.add(webviewInternal);
    vidWin.open();
    utils.currentWindow.push(vidWin);
  }
  catch(e){
    alert(e.message);
  }
};


utils.playVideo = function(url){
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