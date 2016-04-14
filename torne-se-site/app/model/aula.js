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
            titulo = Aula.removeAcentos(titulo);
            var tituloBusca = Aula.removeAcentos(aulas[i].titulo);
            var descricaoBusca = Aula.removeAcentos(aulas[i].descricao);
            var regTitulo = new RegExp(titulo, "i");
            if(tituloBusca.match(regTitulo) != null || descricaoBusca.match(regTitulo)){
              dadosPesquisados.push(aulas[i]);
            }
          }
      }
      
      dadosPesquisados = dadosPesquisados.sort(function(a,b) { return a.numero - b.numero;});
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

Aula.removeAcentos = function(s){
  var r=s.toLowerCase();
  r = r.replace(new RegExp(/[àáâãäå]/g),"a");
  r = r.replace(new RegExp(/æ/g),"ae");
  r = r.replace(new RegExp(/ç/g),"c");
  r = r.replace(new RegExp(/[èéêë]/g),"e");
  r = r.replace(new RegExp(/[ìíîï]/g),"i");
  r = r.replace(new RegExp(/ñ/g),"n");                
  r = r.replace(new RegExp(/[òóôõö]/g),"o");
  r = r.replace(new RegExp(/œ/g),"oe");
  r = r.replace(new RegExp(/[ùúûü]/g),"u");
  r = r.replace(new RegExp(/[ýÿ]/g),"y");
  return r;
};

module.exports = Aula;