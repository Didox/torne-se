var app = window.app || {};
app.showLoading = function(){
  $(".carregando").show();
};

app.hideLoading = function(moveTop){
  setTimeout(function(){
    moveTop = moveTop == undefined ? true : false;
    $(".carregando").hide();
    if(moveTop) app.scrollTop(0);
  }, 500);
};

app.showLoading();

$(document).ready(function(){
  if(! document.location.href.match(/(aula\?)|(alunos)|(empresas)|(objetivo)/)){
    app.hideLoading();
  }
});

app.openInternalLink = function(url){
  var id = url.replace('video.html?id=', '');
  window.location.href='aula?id=' + id;
}

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.getParameterByName = function(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);

  return match ? match[1] : null;
};

app.getYoutubeImagem = function(youtube_url){
  var id_video = app.getIdYoutubeImagem(youtube_url);
  return video_imagem = "http://img.youtube.com/vi/"+ id_video + "/hqdefault.jpg";
};

app.getHtmlVideo = function(youtube_url) {
  app.showLoading()
  var video = app.getIdYoutubeImagem(youtube_url);
  return "<iframe onload='app.hideLoading()' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allowfullscreen></iframe>";
};

app.getIdYoutubeImagem = function(youtube_url){
  var id_video = youtube_url.split('v=');
  id_video = id_video[1];
  return id_video;
};


var findAula = function(stop){
  itemFound = false
  $("#videos li div p").each(function(){
    var text = accentsTidy($(this).text().toLowerCase());
    var findText = accentsTidy($('#find').val().toLowerCase());
    if(findText != ""){
      if(text.indexOf(findText) != -1){
        itemFound = true;
        $(this).css("background-color", "#FFFFE0");
        var top = $(this).offset().top - 200;
        scroll(top, 200);
      }
      else{
        $(this).css("background-color", "#fff");
      }
    }
  });

  if(!itemFound){
    $('#find').val("Não encontrado");
    $('#find').click(function(){
      if($(this).val() == "Não encontrado"){
        $(this).val("");
      }
    });
  }
}

var accentsTidy = function(s){
  var r=s.toLowerCase();
  r = r.replace(new RegExp(/\s/g),"");
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/æ/g),"ae");
  r = r.replace(new RegExp(/ç/g),"c");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");                
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/œ/g),"oe");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  r = r.replace(new RegExp(/[ýÿ]/g),"y");
  r = r.replace(new RegExp(/\W/g),"");
  return r;
};


var scroll = function(scrollTo, time) {
  var scrollFrom = parseInt(document.body.scrollTop), i = 0, runEvery = 5;
  scrollTo = parseInt(scrollTo);
  time /= runEvery;
  var interval = setInterval(function () {
    i++;
    document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
    if (i >= time) {
      clearInterval(interval);
    }
  }, runEvery);
}