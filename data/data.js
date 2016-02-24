var version = {
  v: 9.2,
  message: 'Nova versão do aplicativo totalmente reformulado para melhorar sua experiência disponível'
}

var aviso = {
  message: 'Nova aula disponível\nDeseja assistir agora?',
  confirm: true,
  url: 'video.html?id=AHWYDpI70zQ',
  openUrl: false
}

var data = [
  {
    titulo: 'Aula 21 - Aplicação back-end com Node.js',
    descricao: 'Nesta aula você verá as diferenças entre uma aplicação back-end e front-end, aprenderá como instalar o node.js com framework express,  o que é um framework, como manipular o arquivo hosts da sua máquina e como levantar um servidor na sua máquina.',
    videoYoutube: 'https://www.youtube.com/watch?v=AHWYDpI70zQ'
  },
  {
    titulo: 'Aula 20 - Versionando seu código (aprendendo git)',
    descricao: 'Nesta aula explico o conceito de versionamento de código, utilizando a ferramenta GIT, você poderá guardar os seus arquivos em um servidor, recuperando as versões do mesmo, ou seja não perdendo o seu trabalho que levou anos para fazer, outra coisa boa é o conceito de colaboração, deixar o seu código aberto para outras pessoas colaborarem com a evolução do projeto.',
    videoYoutube: 'https://www.youtube.com/watch?v=JiyKMqVfP1M'
  },
  {
    titulo: 'Aula 19 - Utilizando linha de comando',
    descricao: 'Olá alunos, nesta aula vocês irão ver como utilizar a linha do Unix e DOS, para agilizar no processo no desenvolvimento de programas. Utilizar comandos como: dir, mkdir, ls copy, move, mv, cp.',
    videoYoutube: 'https://www.youtube.com/watch?v=3vc8FrAKC7Q'
  },
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
