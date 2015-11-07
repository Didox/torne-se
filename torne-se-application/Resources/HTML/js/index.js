var app = window.app || {};

app.isAndroid = function() {
  return navigator.userAgent.match(/Android/i);
};

app.isIphone = function() {
  return navigator.userAgent.match(/iPhone/i);
};

app.isMobile = function(){
  if(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ){ return true; }
  else { return false; }
};

app.getYoutubeImagem = function(youtube_url){
  var id_video = app.getIdYoutubeImagem(youtube_url);
  return video_imagem = "http://img.youtube.com/vi/"+ id_video + "/hqdefault.jpg";
};

app.getHtmlVideo = function(youtube_url) {
  app.showLoading()
  var video = app.getIdYoutubeImagem(youtube_url);
  return "<iframe width='98%' onload='setTimeout(function(){app.hideLoading()}, 500);' height='300px' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allowfullscreen></iframe>";
};

app.getIdYoutubeImagem = function(youtube_url){
  var id_video = youtube_url.split('v=');
  id_video = id_video[1];
  return id_video;
};

app.fixAndroidCaractere = function(){
  if(app.isAndroid()){
    if(window.location.hash.indexOf(":") !== -1){
      window.location.hash = window.location.hash.replace(/:/g, '%3A');
    }
  }
};

app.unfixAndroidCaractere = function(){
  if(app.isAndroid()){
    app.replaceDoisPontos();
  }
};

app.replaceDoisPontos = function(){
  window.location.hash = window.location.hash.replace(/%3A/g, ':');
};

app.openInternalLink = function(url) {
  //window.location = url;
  app.showLoading();
  url = url.replace(/:/g,'%3A');
  app.openWindow(url);
  app.hideLoading();
};

app.backWindow = function() {
  app.showLoading();
  app.closeWindow();
};

app.notEmpty = function(str) {
  return str !== undefined && str !== "undefined" && str !== "" && str !== null && str !== 'null';
};

app.empty = function(str) {
  return !app.notEmpty(str);
};

app.openUrl = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openUrl',{url: url});
  }catch(e){
    alert(e.message);
  }
};

app.openUrlMensagem = function(url, mensagem) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openUrl',{url: url, message: mensagem});
  }catch(e){
    alert(e.message);
  }
};

app.openWindow = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openWindow',{url: url});
  }
    catch(e){
      alert(e.message);
    }
};

app.backToHome = function(url) {
  app.showLoading();
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('backToHome');
  }
    catch(e){
      alert(e.message);
    }
};

app.closeWindow = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('closeWindow');
  }
    catch(e){
      alert(e.message);
    }
};

app.openVideo = function(url) {
  try{
    var Ti = window.parent.Ti;
    Ti.App.fireEvent('openVideo',{url: url});
  }
    catch(e){
      alert(e.message);
    }
};


app.VideoHtml = null;

app.setupModal = function(slug){
  $('.abrir-modal').click(function(e){
    e.preventDefault();
    app.openModal(this.hash);
    if(!app.isAndroid() && app.notEmpty(app.VideoHtml)){
      $(".video-estab").html(app.VideoHtml);
    }
    //app.pageviewAnalytics("eventos/"+slug,"Eventos");
  });
  $('.modal-close').click(function(e){
    app.closeModal(this.hash);
  });
  $('.folder a.folder-title').click(function(e){
    e.preventDefault();
    $(this).parent().toggleClass('folder-open');
  });
};

app.moeda = function(n){
  return String(parseFloat(n).toFixed(2)).replace(/\.(\d\d)$/,',$1');
};

app.getParameterByName = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);

  return match ? match[1] : null;
};

app.getParams = function(){
  var p = window.location.href.match(/[?&#]([^?&#]+)/g);
  return p ? p.map(function(v){return v.replace(/[?&#]/, '');}) : null;
};

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.networkOffAlert = function(){
  if(Ti !== undefined){
    Ti.App.fireEvent('networkOffAlert');
  }
};

app.messageForUser = function(){
  try{
    if(aviso){
      if(app.notEmpty(aviso.message)){
        if(Ti !== undefined){
          Ti.App.fireEvent('messageForUser',{
            message: aviso.message,
            confirm: aviso.confirm,
            url: aviso.url,
            openUrl: aviso.openUrl
          });
        }
      }
    }
  }
  catch(e){}
};

try{
  var Ti = {
    _event_listeners: [],
    createEventListener: function(listener) {
      var newListener = { listener: listener, systemId: -1, index: this._event_listeners.length };
      this._event_listeners.push(newListener);
      return newListener;
    },
    getEventListenerByKey: function(key, arg) {
      for (var i = 0;i < this._event_listeners.length; i++) {
        if (this._event_listeners[i][key] == arg) {
          return this._event_listeners[i];
        }
      }
      return null;
    },
    API: TiAPI,
    App: {
      addEventListener: function(eventName, listener){
        var newListener = Ti.createEventListener(listener);
        newListener.systemId = TiApp.addEventListener(eventName, newListener.index);
        return newListener.systemId;
      },
      removeEventListener: function(eventName, listener){
        if (typeof listener == 'number') {
          TiApp.removeEventListener(eventName, listener);
          var l = Ti.getEventListenerByKey('systemId', listener);
          if (l !== null) {
            Ti._event_listeners.splice(l.index, 1);
          }
        } else {
          l = Ti.getEventListenerByKey('listener', listener);
          if (l !== null) {
            TiApp.removeEventListener(eventName, l.systemId);
            Ti._event_listeners.splice(l.index, 1);
          }
        }
      },
      fireEvent: function(eventName, data){
        TiApp.fireEvent(eventName, JSON.stringify(data));
      }
    },
    executeListener: function(id, data){
      var listener = this.getEventListenerByKey('index', id);
      if (listener !== null) {
        listener.listener.call(listener.listener, data);
      }
    }
  };
  var Titanium = Ti;
}catch(e){}

app.networkOffAlert();

app.loadByUrl = function(params, callbackSucess, callbackError){
  var config = {
    success: function(data) {
      callbackSucess.call(null, data);
    },
    error: function(xhr, type) {
      callbackError.call(xhr, type);
    },
  }

  config.url = params.url;
  if(params.type) config.type = params.type;
  if(params.data) config.data = params.data;
  if(params.dataType) config.dataType = params.dataType;
  $.ajax(config);
}

app.updateApp = function(){
  try{
    if(version){
      if(app.appVersion < parseInt(version.v)){
        if (app.isAndroid()){
          //app.openUrlMensagem("https://github.com/Didox/torne-se/blob/master/app_published/android/Torne-se%20um%20programador.apk?raw=true", version.message + '\n\nDeseja atualizar agora?');
          app.openUrlMensagem("https://play.google.com/store/apps/details?id=com.didox.programador", version.message + '\n\nDeseja atualizar agora?');
        }
        else{
          app.openUrlMensagem("https://itunes.apple.com/br/app/torne-se-um-programador/id370195473?mt=8", version.message + '\n\nDeseja atualizar agora?');
        }
      }
    }
  }
  catch(e){}
}

