var data = [
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
  setTimeout(function(){
    if($("#videos").size() > 0){
      $("#loadMore").remove();
      var html = "";
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
      $("#videos").append(html);

      var html = "";
      html += "<li id='loadMore'>";
      html += "  <button type=\"button\" onclick=\"loadMore();\">Carregar mais</button>";
      html += "</li>"
      $("#videos").append(html);
    }
  }, 500)
});

var loadMore = function(){
  $("#loadMore").html("<p class=\"carregando\">Carregando</p>");
  var s = document.createElement('script');
  s.setAttribute('src','file:///Users/didox/projects/torne-se/data/videos2.js');
  document.head.appendChild(s);
}