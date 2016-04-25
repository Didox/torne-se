var version = {
  v: 9.2,
  message: 'Nova versão do aplicativo totalmente reformulado para melhorar sua experiência disponível'
}

var aviso = {
  message: '',
  //message: 'Nova aula disponível\nDeseja assistir agora?',
  confirm: true,
  url: 'video.html?id=065fBE0Jezk',
  openUrl: false
}

var data = [
  {
    numero: 29,
    titulo: 'Aula 29 - Utilizando Bootstrap',
    descricao: 'Nesta aula vocês irão aprender o que é o bootstrap, para que serve e como dar vida a um html básico utilizando a sua folha de estilo. Mudaremos o nosso cadastro deixando-o mais bonito.',
    videoYoutube: 'https://www.youtube.com/watch?v=065fBE0Jezk',
    tipo: 'html_css'
  },
  {
    numero: 28,
    titulo: 'Aula 28 - Como conectar sua aplicação ao MySql',
    descricao: 'Nesta aula explico como conectar nossa aplicação em Node.js no MySql, fazendo uma refatoração em nosso código deixando a responsabilidade dos dados no nosso servidor de banco de dados.',
    videoYoutube: 'https://www.youtube.com/watch?v=ZZ5AWeMa5mE'
  },
  {
    numero: 27,
    titulo: 'Aula 27 - Utilizando comandos SQL',
    descricao: 'Nesta aula você irá aprender os conceitos de banco de dados SQL, porque utiliza-lo e quando utiliza-lo, aprenderá como incluir, alterar, selecionar e deletar dados, como utilizar um client para facilitar a criação de comandos.',
    videoYoutube: 'https://www.youtube.com/watch?v=_IKoyIi7VAo'
  },
  {
    numero: 26,
    titulo: 'Aula 26 - Refatorando codigo',
    descricao: 'Nesta aula você irá junto comigo refatorar o código que fizemos nas aulas anteriores, organizando-o em arquivos separados e criando objetos para melhorar a visualização e o entendimento do código. Visando manutenção no futuro.',
    videoYoutube: 'https://www.youtube.com/watch?v=1oddz49LZgo'
  },
  {
    numero: 25,
    titulo: 'Aula 25 - Editando e excluindo dados em arquivos',
    descricao: 'Nesta aula iremos concluir o nosso CRUD (Create, Read, Update, Delete), fazendo com que o cadastro que criamos, tenha a possibilidade de fazer o processo completo de um cadastro.',
    videoYoutube: 'https://www.youtube.com/watch?v=00ARVfHHVz8'
  },
  {
    numero: 24,
    titulo: 'Aula 24 - Pesquisando em arquivos',
    descricao: 'Nesta aula você irá aprender como buscar dados em arquivos, utilizando os comandos .toLowerCase()  . toUpperCase() para maiúsculo e minúsculo, Regex para busca, match exato, lógica para validação de strings, looping e muito mais.',
    videoYoutube: 'https://www.youtube.com/watch?v=sspYqCwqguk'
  },
  {
    numero: 23,
    titulo: 'Aula 23 - Gravando dados em arquivos',
    descricao: 'Nesta aula você aprenderá como gravar os seus dados que estão na memória de um servidor, dentro de arquivos, recuperando assim os dados depois que reiniciar o seu servidor.',
    videoYoutube: 'https://www.youtube.com/watch?v=kKxnxSQKE4c'
  },
  {
    titulo: 'Aula 22 - Criando aplicação back-end',
    descricao: 'Nesta aula mostro na prática a diferença de uma aplicação back-end e front-end, mostro como criar novas rotas no Node.js e ensino como utilizar os verbos POST e GET para cadastro.',
    videoYoutube: 'https://www.youtube.com/watch?v=SxCjF0t4O3M'
  },
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
    s.setAttribute('src','http://www.torneseumprogramador.com.br/javascripts/data/' + file);
    document.head.appendChild(s);
  }
  catch(e){}
}
