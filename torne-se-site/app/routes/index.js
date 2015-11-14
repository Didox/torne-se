var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home_controller');
var AulasController = require('../controllers/aulas_controller');
var SobreController = require('../controllers/sobre_controller');

router.get('/', HomeController.index);

router.get('/aula', AulasController.aula);
router.get('/aulas', AulasController.index);

router.get('/sobre', SobreController.index);

module.exports = router;