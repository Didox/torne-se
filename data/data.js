var version = {
  v: 9.2,
  message: 'Nova versão do aplicativo totalmente reformulado para melhorar sua experiência disponível'
}

var aviso = {
  message: '',
  confirm: true,
  url: 'video.html?id=WbjNDguEugw',
  openUrl: false
}

var data = [
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
  },
  {
    titulo: 'Aula 11 - Orientação a Objetos parte 1',
    descricao: 'Nesta aula você irá conhecer um dos assuntos que mais fazem diferença entre um bom programador e somente um programador, organizar o seu código utilizando orientação a objetos.',
    videoYoutube: 'https://www.youtube.com/watch?v=K7VMgGX9vIY'
  },
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
    descricao: 'Nesta aula você irá aprender a utilizar Hash, ou seja uma forma estruturada para organizar suas variáveis como um objeto ',
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
