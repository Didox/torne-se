var data = [
  {
    titulo: 'Aula 1 - Conceitos básicos',
    descricao: 'Aula 1 que fala sobre os conceitos básicos de como ser um programador',
    videoYoutube: 'https://www.youtube.com/watch?v=oHJzyf3EwWU'
  },
]

$(document).ready(function(){
  if($("#videos").size() > 0){
    $("#loadMore").remove();
    loadVideos(false, 0);
  }
});
