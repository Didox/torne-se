var data = [
  {
    titulo: 'Aula 18 - JQuery',
    descricao: 'Nesta aula você irá aprender um dos frameworks mais famosos para quem trabalha com Frond-End ou seja com javascript. JQuery é muito poderoso, com ele você irá economizar muito tempo ao trabalhar com DHTML.',
    videoYoutube: 'https://www.youtube.com/watch?v=701jjz1-VFE'
  },
  {
    titulo: 'Aula 17 - Aprendendo DHTML parte 2',
    descricao: 'Nesta aula você aprenderá como fazer validação de um formulário, como manipular elementos DOM (nextSibling, previousSibling), animação utilizando opacity e as funções setTimeout e setInterval.',
    videoYoutube: 'https://www.youtube.com/watch?v=LH7AXRwZY0o'
  },
  {
    titulo: 'Aula 17 - Aprendendo DHTML parte 1',
    descricao: 'Nesta aula você irá aprender como transformar o seu HTML estático em dinâmico ou seja fazer a integração do html com o javascript.',
    videoYoutube: 'https://www.youtube.com/watch?v=vfbS2qN8dH8'
  },
  {
    titulo: 'Aula 16 - Uso de styles e css parte 3',
    descricao: 'Nesta aula mostro o final da explicação de html + css, ou seja terminando mais uma parte do exercício que é transformar uma imagem em um HTML.',
    videoYoutube: 'https://www.youtube.com/watch?v=JDmv8Yj95bw'
  },
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
  },
  {
    titulo: 'Aula 11 - Orientação a Objetos parte 1',
    descricao: 'Nesta aula você irá conhecer um dos assuntos que mais fazem diferença entre um bom programador e somente um programador, organizar o seu código utilizando orientação a objetos.',
    videoYoutube: 'https://www.youtube.com/watch?v=K7VMgGX9vIY'
  }
]

$(document).ready(function(){
  if($("#videos").size() > 0){
    $("#loadMore").remove();
    loadVideos(true, 2);
  }
});
