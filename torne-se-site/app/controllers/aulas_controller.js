var Aula = require('../model/aula')

var AulasController = {
  index: function(request, response) {
    response.setHeader('Cache-Control', 'max-age=86400, public, no-transform'); //cache de 1 dia
    
    response.render('aulas/index');
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