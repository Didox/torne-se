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
  app.fixLoad();
  app.appDownload();
  app.loadButtonsActions();
  app.loadLastLessions();
  app.faPagePopUp();
  //app.moreVideoByScroll();
});

app.fixLoad = function(){
  if(! document.location.href.match(/(aula\?)|(alunos)|(empresas)|(objetivo)/)){
    app.hideLoading();
  }
}

app.appDownload = function(){
  if(app.isIphone()){
    $("#linkTokePag").attr("href", "https://itunes.apple.com/br/app/itau-tokpag/id724817389?mt=8");
    $("#linkItauApp").attr("href", "https://itunes.apple.com/br/app/itau-30-horas/id474505665?mt=8");
  }
}

app.faPagePopUp = function(){
  if(document.cookie.indexOf('facebookWidgetTornese')==-1){
    setTimeout(function(){
      $('.facebookWidget').fadeIn();
      $('.facebookWidget .widget').append('<span class="fechar">Fechar</span>');
      $('.facebookWidget .widget .fechar').click(function(e){
        e.preventDefault();
        $('.facebookWidget').fadeOut();
      });
      var data=new Date();
      data.setTime(data.getTime()+(15*24*60*60*1000)); // 15 DIAS
      document.cookie='facebookWidgetTornese=sim;expires='+data.toUTCString()+';path=/';
    },5000);
  }
}

app.moreVideos = function(){
  var i = 0;
  $("#videos-dinamico .video.hidden").each(function(){
    if(i < 10){
      $(this).removeClass("hidden");
      var imagem = $(this).find("img").data("imagem");
      $(this).find("img").attr("src", imagem);
    }
    else{
      return;
    }
    i++;
  });

  if($("#videos-dinamico .video.hidden").size() == 0){
    $("#loadMoreVideo").remove();
  }
}

app.moreVideoByScroll = function(){
  if($("#videos-dinamico").size() > 0){
    $(window).scroll(function() {
      if($(window).scrollTop() > ($(".container-aulas").height() - 800)) {
        app.moreVideos();
      }
    });
  }
}

app.notEmpty = function(str) {
  return str !== undefined && str !== "undefined" && str !== "" && str !== null && str !== 'null';
};

app.empty = function(str) {
  return !app.notEmpty(str);
};

app.loadLastLessions = function(){
  if($(".ultimas-aulas").size() > 0 && $(".ultimas-aulas").css('display') != "none"){
    var html = "<a class=\"header link\" href=\"/aulas\">Últimas aulas</a>";
    html += "<ul>";
    
    for(i=0;i<4; i++){
      html += "<li>";
      html += "  <div>";
      html += "    <a href=\"/aula?id=" + app.getIdYoutubeImagem(data[i].videoYoutube) + "\">";
      html += "      <img src='" + app.getYoutubeImagem(data[i].videoYoutube) + "' style='width: 100px;height: 80px;'>";
      html += "      <p>" + data[i].titulo + "</p>";
      html += "      <span style='display:none'>" + data[i].descricao + "</span>";
      html += "    </a>";
      html += "  </div>";
      html += "</li>"
    }

    html += "</ul>";
    html += "<a class=\"link footer\" href=\"/aulas\">Últimas aulas</a>";
    $(".ultimas-aulas").html(html);
  }
}

app.loadButtonsActions = function(){
  $("#lupa a").click(function(){
    $("#nome_site").hide();
    $("#lupa").hide();
    $("#findAula").show();
    $("#aula").focus();
  });
}

app.scrollTop = function(index){
  window.scrollTo(index,0);
};

app.saveMail = function(){
  var nome = $("#nome");
  var email = $("#email");

  if(nome.val() == ""){
    nome.val("Nome obrigatório");
    setTimeout(function(){
      nome.val("");
      nome.focus();
    }, 800);
    return;
  }

  if(email.val() == ""){
    email.val("Email obrigatório");
    setTimeout(function(){
      email.val("");
      email.focus();
    }, 800);
    return;
  }

  if(email.val().match(/\@.*?\./) == null){
    email.val("Email inválido");
    setTimeout(function(){
      email.val("");
      email.focus();
    }, 800);
    return;
  }

  key_email = email.val().replace(/\@|\.|#|,|\]|\[|\$/g, "")
  var myFirebaseRef = new Firebase("https://scorching-fire-3573.firebaseio.com/emails").child(key_email);
  myFirebaseRef.set({ email: email.val(), nome: nome.val() });

  nome.val("Registrado");
  email.val("Registrado");
  setTimeout(function(){
    nome.val("");
    email.val("");
  }, 800);
}

app.isAndroid = function() {
  return navigator.userAgent.match(/Android/i);
};

app.isIphone = function() {
  return navigator.userAgent.match(/iPhone/i);
};

//apagar estes metodos pois são antigos, depois que fizer a api
app.getParameterByName = function(){
  return "";
}

app.getYoutubeImagem = function(youtube_url){
  var id_video = app.getIdYoutubeImagem(youtube_url);
  return video_imagem = "http://img.youtube.com/vi/"+ id_video + "/hqdefault.jpg";
};

app.getHtmlVideo = function(youtube_url) {
  app.showLoading()
  var video = app.getIdYoutubeImagem(youtube_url);
  $(".fb-share-button").attr("data-href", "http://www.torneseumprogramador.com.br/aula?id=" + video)
  return "<iframe onload='app.hideLoading()' src='https://www.youtube.com/embed/"+video+"' frameborder='0' allowfullscreen></iframe>";
};

app.getIdYoutubeImagem = function(youtube_url){
  var id_video = youtube_url.split('v=');
  id_video = id_video[1];
  return id_video;
};