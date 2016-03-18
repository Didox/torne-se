var data = [
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
    titulo: 'Aula 4 - Operadores condicionais e lógicos parte 2',
    descricao: 'Nesta aula iremos falar sobre operadores condicionais, concatenação de strings, diferença de variável string e inteiro, operadores lógicos ',
    videoYoutube: 'https://www.youtube.com/watch?v=nYF_WhoexhY'
  },
  {
    titulo: 'Aula 4 - Operadores condicionais e lógicos parte 1',
    descricao: 'Nesta aula iremos falar sobre operadores condicionais, concatenação de strings, diferença de variável string e inteiro, operadores lógicos ',
    videoYoutube: 'https://www.youtube.com/watch?v=cN_F2E7yKVQ'
  },
  {
    titulo: 'Aula 3 - Operadores matemáticos',
    descricao: 'Nesta aula iremos aprender como utilizar a lógica de programação para resolver expressões numéricas, utilizando os operadores matemáticos. ',
    videoYoutube: 'https://www.youtube.com/watch?v=Ak5PnSGAzII'
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
  }
]

$(document).ready(function(){
  if($("#videos").size() > 0){
    $("#loadMore").remove();
    loadVideos(false, 0);
  }
});
