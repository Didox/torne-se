var AulasController = {
  index: function(request, response) {
    response.render('aulas/index');
  },

  aula: function(request, response) {
    response.render('aulas/show', {tipo: request.query.tipo});
  },

  iniciante: function(request, response) {
    response.render('aulas/iniciante');
  }
}

module.exports = AulasController;