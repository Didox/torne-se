var Config = require('../../config/base')

var Aula = function(){
  this.numero = "";
  this.titulo = "";
  this.descricao = "";
  this.videoYoutube = "";
  this.tipo = "";
}

Aula.buscarPorTipo = function(tipo, callback){
  Aula.todos(function(aulas) {
      if (aulas == []) { 
        console.log("Aula não encontrada em nossa base de dados");
        callback.call(null, []);
      }
      else{
        var aulasTipo = [];
        for(var i=0; i<aulas.length; i++){
          if(aulas[i].tipo == tipo){
            aulasTipo.push(aulas[i]);
          }
        }

        aulasTipo = aulasTipo.sort(function(a,b) { return a.numero - b.numero;});
        callback.call(null, aulasTipo);
      }
  });
}

Aula.buscarPorYoutubeId = function(id, callback){
  Aula.todos(function(aulas) {
      if (aulas == []) { 
        console.log("Aula não encontrada em nossa base de dados");
        callback.call(null, null);
      }
      else{
        var aula = null;
        for(var i=0; i<aulas.length; i++){
          if(aulas[i].videoYoutube == id){
            aula = aulas[i];
          }
        }

        callback.call(null, aula);
      }
  });
}

Aula.buscarPorNumero = function(numero, callback){
  Aula.todos(function(aulas) {
      if (aulas == []) { 
        console.log("Aula não encontrada em nossa base de dados");
        callback.call(null, null);
      }
      else{
        var aula = null;
        for(var i=0; i<aulas.length; i++){
          if(aulas[i].numero == numero){
            aula = aulas[i];
            break;
          }
        }

        callback.call(null, aula);
      }
  });
}

Aula.buscarPorTituloDescricao = function(titulo, callback){
  Aula.todos(function(aulas){
      if (aulas == []) { 
        console.log("Aula não encontrada em nossa base de dados");
        callback.call(null, aulas);
      }
      else{
        var dadosPesquisados = [];
        if(titulo == ""){
          dadosPesquisados = aulas;
        }
        else{
          for(var i=0; i<aulas.length; i++){
            var regTitulo = new RegExp(titulo, "i");
            var regDescricao = new RegExp(titulo, "i");
            if(aulas[i].titulo.match(regTitulo) != null || aulas[i].titulo.match(regDescricao)){
              dadosPesquisados.push(aulas[i]);
            }
          }
      }
     
      callback.call(null, dadosPesquisados);
    }
  });
}

Aula.todos = function(callback){
  var fs = require('fs');
  fs.readFile(Config.AULAS, "utf-8", function(err, data) {
    var aulas = [];
    if (err) { 
      console.log(err);
    }
    else{
      aulas = eval(data);
    }
    callback.call(null, aulas);
  });
}

module.exports = Aula;