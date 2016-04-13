var Aula = require('../model/aula')

var AulasController = {
  index: function(request, response) {
    response.render('aulas/index');
  },

  aula: function(request, response) {
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
  	Aula.buscarPorTipo('iniciante', function(aulas){
    	response.render('aulas/iniciante', {
    		aulas: aulas
    	});
  	});
  }
}

module.exports = AulasController;