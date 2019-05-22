//var proxy_secret_token = process.env.PROXY_SECRET_TOKEN
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var fortune = require('./routes/fortune');
var api= require('./routes/api');
//var fortune_with_plugin = require('./routes/fortune-with-plugin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(function(req,res,next){
 value = req.get('X-3scale-proxy-secret-token');
 if(value != proxy_secret_token){
   res.send(401);
   return
 }
 next()
});
*/

app.use('/', index);
app.use('/users', users);
app.use('/fortune', fortune);
app.use('/api', api);
//app.use('/fortune-with-plugin', fortune_with_plugin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
