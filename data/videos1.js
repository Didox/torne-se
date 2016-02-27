var data = [
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
  }
]

$(document).ready(function(){
  if($("#videos").size() > 0){
    $("#loadMore").remove();
    loadVideos(false, 0);
  }
});
