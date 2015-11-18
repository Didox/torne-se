var data = [
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
