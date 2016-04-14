var Aula = require('../model/aula')

var AulasController = {
  todas: function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, GET');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Credentials', true);
    response.setHeader('Cache-Control', 'max-age=86400, public, no-transform'); //cache de 1 dia
    
    Aula.todos(function(aulas){
      response.send(aulas, 200);
    });
  },

  index: function(request, response) {
    response.setHeader('Cache-Control', 'max-age=86400, public, no-transform'); //cache de 1 dia
    if(request.query.q){
      Aula.buscarPorTituloDescricao(request.query.q, function(aulas){
        response.render('aulas/index', {
          aulas: aulas,
          termo: request.query.q
        });
      });
    }
    else{
      Aula.todos(function(aulas){
        response.render('aulas/index', {
          aulas: aulas,
          termo: ""
        });
      });
    }
  },

  aula: function(request, response) {
    response.setHeader('Cache-Control', 'max-age=2419200, public, no-transform'); //cache de 28 dias
    
    Aula.buscarPorYoutubeId(request.query.id, function(aula){
      if(aula != null){
        response.render('aulas/show', {
          tipo: request.query.tipo,
          aula: aula,
        });
      }
      else{
        response.status(404).render('404');
      }
    });
  },

  iniciante: function(request, response) {
    response.setHeader('Cache-Control', 'max-age=2419200, public, no-transform'); //cache de 28 dias

  	Aula.buscarPorTipo('iniciante', function(aulas){
    	response.render('aulas/iniciante', {
    		aulas: aulas
    	});
  	});
  }
}

module.exports = AulasController;