var data = [
  {
    titulo: 'Aula 1 - Conceitos básicos',
    descricao: 'Aula 1 que fala sobre os conceitos básicos de como ser um programador',
    videoYoutube: 'https://www.youtube.com/watch?v=oHJzyf3EwWU'
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
    }
  }, 500)
});

