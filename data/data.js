var version = {
  v: '5',
  message: 'Nova versão do aplicativo completo para download, com este você terá notificações de novas aulas.'
}

var aviso = {
  message: 'Quarta-feira tem nova aula por aí, aproveitem o final de semana e revisem as aulas anteriores',
  confirm: false,
  url: 'video.html?id=DbR-luEtC1I',
  openUrl: false
}

var data = [
  {
    titulo: 'Aula 10 - Programação funcional',
    descricao: 'Nesta aula você aprenderá o que é programação funcional, como escrever um código mais organizado e simples utilizando funções, e separá-los em arquivos, deixando em contextos diferentes.',
    videoYoutube: 'https://www.youtube.com/watch?v=DbR-luEtC1I'
  },
  {
    titulo: 'Aula 9 - Funções recursivas e constantes',
    descricao: 'Nesta aula você irá aprender o que é uma variável constante e como aplicar em um programa, também irá aprender o que é funções recursivas, como utiliza-las e como aplicar em um programa.',
    videoYoutube: 'https://www.youtube.com/watch?v=NYGGaTd_xZk'
  },
  {
    titulo: 'Aula 8 - Funções',
    descricao: 'Nesta aula você irá aprender como criar uma função em javascript, para que serve e quais os tipos de funções utilizadas. ',
    videoYoutube: 'https://www.youtube.com/watch?v=WGbVQTWqEko'
  },
  {
    titulo: 'Aula 7 - Hash',
    descricao: 'Nesta aula você irá aprender a utilizar Hash, ou seja uma forma estrutura para organizar suas variáveis como um objeto ',
    videoYoutube: 'https://www.youtube.com/watch?v=SCL93-7zWWw'
  },
  {
    titulo: 'Aula 6 - Array',
    descricao: 'Nesta aula você irá aprender como utilizar o Array (coleção de espaços de memória), verá na prática a sua utilização e criará junto comigo um programa para calcular a média de alunos. ',
    videoYoutube: 'https://www.youtube.com/watch?v=e3r9Q9L0-sU'
  },
  {
    titulo: 'Aula 5 - Looping',
    descricao: 'Nesta aula ensino como utilizar a estrutura de repetição (lopping) e a diferença de um programa utilizando repetição e não usando repetição. ',
    videoYoutube: 'https://www.youtube.com/watch?v=XwmFtcPanIU'
  },
  {
    titulo: 'Aula 4 - Operadores lógicos parte 2',
    descricao: 'Nesta aula iremos falar sobre operadores condicionais, concatenação de strings, diferença de variável string e inteiro, operadores lógicos ',
    videoYoutube: 'https://www.youtube.com/watch?v=nYF_WhoexhY'
  },
  {
    titulo: 'Aula 4 - Operadores lógicos parte 1',
    descricao: 'Nesta aula iremos falar sobre operadores condicionais, concatenação de strings, diferença de variável string e inteiro, operadores lógicos ',
    videoYoutube: 'https://www.youtube.com/watch?v=cN_F2E7yKVQ'
  },
  {
    titulo: 'Aula 3 - Operadores matemáticos',
    descricao: 'Nesta aula iremos aprender como utilizar a lógica de programação para resolver expressões numéricas, utilizando os operadores matemáticos. ',
    videoYoutube: 'https://www.youtube.com/watch?v=z-_vVAyJLrY'
  },
  {
    titulo: 'Aula 2 - Variáveis',
    descricao: 'Este vídeo mostra o que é uma variável, para que serve uma variável e como utilizar uma variável em um código fonte ',
    videoYoutube: 'https://www.youtube.com/watch?v=5_ak7LNFyWw'
  },
]

$(document).ready(function(){
  loadVideos(true, 1);
  loadVideo();
});




// ====================================== Helpers ====================================================
var videoFound = false;
var loadVideo = function(){
  if($("#video_container").size() > 0){
    setTimeout(function(){
      var id = app.getParameterByName("id");
      setVideo();
      loadAndSetMoreVideo(1);
    }, 50)
  }
}

var setVideo = function(){
  for(i=0;i<data.length; i++){
    if(data[i].videoYoutube.indexOf(id) != -1){
      videoFound = true
      $("#titulo").html(data[i].titulo);
      $("#descricao").html(data[i].descricao);
      $("#video").html(app.getHtmlVideo(data[i].videoYoutube));
      break;
    }
  }
}

var loadAndSetMoreVideo = function(index){
  if(!videoFound){
      loadMore('videos' + index + '.js', function(){
        setVideo();
        loadAndSetMoreVideo(index + 1);
      });
    }
}

var loadVideos = function(find,indexVideos){
  if($("#videos").size() > 0){
    setTimeout(function(){
      var html = "";
      if(find){
        html += "<li>";
        html += "  <div>";
        html += "   <input type='text' id='find' style='border:2px solid #337ab7;height: 17px;border-radius: 4px;color: #265a88;padding: 3px;'><a href=\"#\" onclick=\"findAula();\" style=\"background-color: #337ab7;width: 100px;height: 18px;border-radius: 4px;padding: 6px;margin-left: 2px;color: #fff;font-size: 12px;\">Buscar</a>";
        html += "  </div>";
        html += "</li>";
      }

      for(i=0;i<data.length; i++){
        html += "<li>";
        html += "  <div class='video'>";
        html += "    <a href=\"javascript:app.openInternalLink('video.html?id=" + app.getIdYoutubeImagem(data[i].videoYoutube) + "');\">";
        html += "      <img src='" + app.getYoutubeImagem(data[i].videoYoutube) + "' style='width: 200px;height: 150px;'>";
        html += "      <p>" + data[i].titulo + "</p>";
        html += "    </a>";
        html += "  </div>";
        html += "</li>"
      }

      if(indexVideos != undefined && indexVideos != 0){
        var html = "";
        html += "<li id='loadMore'>";
        html += "  <button type=\"button\" onclick=\"loadMore('videos" + indexVideos + ".js');\">Carregar mais</button>";
        html += "</li>"
      }

      if(indexVideos == 1){
        $("#videos").html(html);
      }
      else{
        $("#videos").append(html);
      }
    }, 50)
  }
}

var findAula = function(){
  $("#videos li div p").each(function(){
    var text = accentsTidy($(this).text().toLowerCase());
    var findText = accentsTidy($('#find').val().toLowerCase());
    if(findText != ""){
      if(text.indexOf(findText) != -1){
        itemFound = this;
        $(this).css("background-color", "#FFFFE0");
        var top = $(this).offset().top - 100;
        scroll(top, 100);
      }
      else{
        $(this).css("background-color", "#fff");
      }
    }
  });
}

accentsTidy = function(s){
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

function scroll(scrollTo, time) {
  var scrollFrom = parseInt(document.body.scrollTop),
    i = 0,
    runEvery = 5; // run every 5ms

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

var loadMore = function(file, callback){
  $("#loadMore").html("<p class=\"carregando\">Carregando</p>");
  var s = document.createElement('script');
  s.onload = callback;
  s.setAttribute('src','https://rawgit.com/Didox/torne-se/master/data/' + file);
  document.head.appendChild(s);
}
