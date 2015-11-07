var version = {
  v: '5',
  message: 'Nova versão do aplicativo completo para download, com este você terá notificações de novas aulas.'
}

var aviso = {
  message: 'Nova aula disponível. Aula 10: programação funcional\nDeseja ver agora?',
  confirm: true,
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
]

$(document).ready(function(){
  setTimeout(function(){
    if($("#videos").size() > 0){
      var html = "";
      html += "<li>";
      html += "  <div>";
      html += "   <input type='text' id='find' style='border:2px solid #337ab7;height: 17px;border-radius: 4px;color: #265a88;padding: 3px;'><a href=\"#\" onclick=\"findAula();\" style=\"background-color: #337ab7;width: 100px;height: 18px;border-radius: 4px;padding: 6px;margin-left: 2px;color: #fff;font-size: 12px;\">Buscar</a>";
      html += "  </div>";
      html += "</li>";

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
      $("#videos").html(html);


      var html = "";
      html += "<li id='loadMore'>";
      html += "  <button type=\"button\" onclick=\"loadMore();\">Carregar mais</button>";
      html += "</li>"
      $("#videos").append(html);
    }
  }, 50)
});

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

var loadMore = function(){
  $("#loadMore").html("<p class=\"carregando\">Carregando</p>");
  var s = document.createElement('script');
  s.setAttribute('src','file:///Users/didox/projects/torne-se/data/videos1.js');
  document.head.appendChild(s);
}