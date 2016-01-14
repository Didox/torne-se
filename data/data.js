var version = {
  v: 9.2,
  message: 'Nova versão do aplicativo totalmente reformulado para melhorar sua experiência disponível'
}

var aviso = {
  message: 'Nova aula disponível\nDeseja assistir agora?',
  confirm: true,
  url: 'video.html?id=HAaLR1iJsB4',
  openUrl: false
}

var data = [
  {
    titulo: 'Aula 16 - Uso de styles e css parte 2',
    descricao: 'Continuação da aula aprendendo html + css. Criando arquivo.css e estilizando uma página através de uma imagem de layout.',
    videoYoutube: 'https://www.youtube.com/watch?v=HAaLR1iJsB4'
  },
  {
    titulo: 'Aula 16 - Uso de styles e css parte 1',
    descricao: 'Nesta aula você irá aprender para que serve o CSS, como estilizar uma pagina HTML, dando cor, layout e vida a sua página.',
    videoYoutube: 'https://www.youtube.com/watch?v=v1GuWjYCrhA'
  },
  {
    titulo: 'Aula 15 - Aprendendo html Parte 3',
    descricao: 'Nesta aula você irá aprender as tags html, img, form, input, frame, iframe e frameset.',
    videoYoutube: 'https://www.youtube.com/watch?v=Ht40eIIY_OQ'
  },
  {
    titulo: 'Aula 15 - Aprendendo html Parte 2',
    descricao: 'Nesta aula você irá aprender a parte 2 da aula aprendendo HTML, vendo agora outras tags como "a", "fildset" e outras.',
    videoYoutube: 'https://www.youtube.com/watch?v=GbdrPMCcVxw'
  },
  {
    titulo: 'Aula 15 - Aprendendo html Parte 1',
    descricao: 'Na aula de hoje iremos aprender os conceitos básicos de um html, para que serve e como utilizá-lo.',
    videoYoutube: 'https://www.youtube.com/watch?v=-9vZHPB19NI'
  },
  {
    titulo: 'Aula 14 - Tipos e tipagem de variáveis',
    descricao: 'Nesta aula você irá aprender os tipos de variáveis existentes em algumas linguagens de programação. As tipagens feitas ou alocações (dinâmica ou estática) e se a linguagem é fortemente tipada ou de tipagem fraca.',
    videoYoutube: 'https://www.youtube.com/watch?v=nXX4u0eYYfQ'
  },
  {
    titulo: 'Aula 13 - Tratamento de strings e regular expression ',
    descricao: 'Nesta Aula vc irá aprender o conceito de tratamento de strings, utilizando comandos como split, replace, e outros. Irá conhecer também Regular Expression (Regex) e como a regex pode facilitar um programa onde você tem a necessidade de trabalhar com textos.',
    videoYoutube: 'https://www.youtube.com/watch?v=7sw5bFo7qFs'
  },
  {
    titulo: 'Aula 12 - Programação assíncrona',
    descricao: 'Nesta aula você irá aprender o conceito de programação assíncrona, conhecida também como programação orientado a evento ou a tread. Utilizando os callback do javascript.',
    videoYoutube: 'https://www.youtube.com/watch?v=WbjNDguEugw'
  },
  {
    titulo: 'Aula 11 - Orientação a Objetos parte 3',
    descricao: 'Nesta aula você aprenderá os outros conceitos envolvidos em orientação a objetos (abstract, final, sealed, partials, singleton, protected, agregação de métodos) que não são utilizados em JavaScript, porém existem e são muito utilizadas em Java, C# e outros.',
    videoYoutube: 'https://www.youtube.com/watch?v=_BmpvTMSn0c'
  },
  {
    titulo: 'Aula 11 - Orientação a Objetos parte 2',
    descricao: 'Esta aula você verá métodos staticos, construtores, constantes, singleton e mais alguns conceitos para orientação a objetos, ou seja uma forma mais organizada de programar.',
    videoYoutube: 'https://www.youtube.com/watch?v=JH3dISDHjc0'
  }
]

$(document).ready(function(){
  loadVideos(true, 1);
  loadVideo();
});

// ====================================== Helpers ====================================================
var id = 0;
var videoFound = false;
var loadVideo = function(){
  id = app.getParameterByName("id");
  if($("#video_container").size() > 0){
    setVideo();
    loadAndSetMoreVideo(1);
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
    var html = "";
    
    for(i=0;i<data.length; i++){
      html += "<li>";
      html += "  <div class='video'>";
      html += "    <a href=\"javascript:app.openInternalLink('video.html?id=" + app.getIdYoutubeImagem(data[i].videoYoutube) + "');\">";
      html += "      <img src='" + app.getYoutubeImagem(data[i].videoYoutube) + "' style='width: 200px;height: 150px;'>";
      html += "      <p>" + data[i].titulo + "</p>";
      html += "      <span style='display:none'>" + data[i].descricao + "</span>";
      html += "    </a>";
      html += "  </div>";
      html += "</li>"
    }

    if(indexVideos != undefined && indexVideos != 0){
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
  }
}

var loadMore = function(file, callback){
  try{
    $("#loadMore").html("<p class=\"carregando\">Carregando</p>");
    var s = document.createElement('script');
    s.onload = callback;
    s.setAttribute('src','https://rawgit.com/Didox/torne-se/master/data/' + file);
    document.head.appendChild(s);
  }
  catch(e){}
}
