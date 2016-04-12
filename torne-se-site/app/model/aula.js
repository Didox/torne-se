var Config = require('../../config/base')

var Aula = function(){
	this.numero = "";
	this.titulo = "";
	this.descricao = "";
	this.videoYoutube = "";

	this.salvar = function(callback, numeroAlterar){
		var numeroInstancia 	= this.numero;
		var tituloInstancia 	= this.titulo;
		var descricaoInstancia 	= this.descricao;
		var videoYoutubeInstancia 	= this.videoYoutube;

		Aula.todos(function(aulas) {
		    if (aulas == []) { 
		      console.log("Aulas não encontada na base de dados");
		      callback.call();
		    }
		    else{
		      if(numeroAlterar == undefined){
		      	var hash = {
			      numero: numeroInstancia,
			      titulo: tituloInstancia,
			      descricao: descricaoInstancia,
			      videoYoutube: videoYoutubeInstancia
			    }

			    aulas.push(hash);
			    aulas.salvarTodos(aulas);
		      }
		      else{
			      for(var i=0; i<aulas.length; i++){
			        if(aulas[i].numero == numeroAlterar){

			          aulas[i].numero = tituloInstancia;
			          aulas[i].titulo = tituloInstancia;
			          aulas[i].descricao = descricaoInstancia;
			          aulas[i].videoYoutube = videoYoutubeInstancia;

			          Aula.salvarTodos(aulas);
			          break;
			        }
			      }
			  }
		      callback.call();
		    }
		});
	}

	this.excluir = function(callback){
		var numeroInstancia = this.numero;
		Aula.todos(function(aulas) {
		    if (aulas == []) { 
		      console.log("Aulas não encontada na base de dados");
		    }
		    else{
		      var aulasRestantes = [];
		      for(var i=0; i<aulas.length; i++){
		        if(aulas[i].numero != numeroInstancia){
		          aulasRestantes.push(aulas[i]);
		        }
		      }

		      Aula.salvarTodos(aulasRestantes);
		      aulas = aulasRestantes;
		    }

		    callback.call(null, aulas)
		});
	}
}

Aula.buscar = function(numero, callback){
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

Aula.salvarTodos = function(Aulas){
  var fs = require('fs');
  fs.writeFile(Config.AULAS, JSON.stringify(Aulas), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

Aula.todos = function(callback){
  var fs = require('fs');
  fs.readFile(Config.AULAS, function(err, data) {
    Aulas = [];
    if (err) { 
      console.log(err);
    }
    else{
      Aulas = JSON.parse(data);
    }
    callback.call(null, Aulas);
  });
}

module.exports = Aula;