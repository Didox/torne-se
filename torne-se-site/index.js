var express = require('express');
var app = express();
var logger = require('morgan');
var routes = require('./app/routes/index');
require('newrelic');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  if(req.headers.host == "torneseumprogramador.com.br"){
    res.redirect("http://www.torneseumprogramador.com.br");
    return;
  }

  app.locals.isMobile = /mobile/i.test(req.headers['user-agent']);
  
  res.header('Vary', 'X-Device, Origin');
  // 60s x 60m x 24h x 3d 
  // 3600 cache de 1 hora ou seja 60m
  res.setHeader('Cache-Control', 'max-age=3600, public, no-transform');
  next();
});

app.use(logger('dev'));
app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  var status = err.status || 500
  if(status >= 500){
    res.status(status);
    console.log("===============================================");
    console.log(err);
    console.log("===============================================");
    res.render(500, {
      message: err.message,
      error: err
    });
  }
  else{
    res.status(status);
    res.render(404);
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


