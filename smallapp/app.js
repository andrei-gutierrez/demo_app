// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'DemoAPM',

  // Use if APM Server requires a token
  // secretToken: '',

  // Use if APM Server uses API keys for authentication
  apiKey: 'Ulg2RE1vY0JfbDJ3alhjYnU2Qms6bVhZbEhkVEZRUC1YX0labER5N0NqZw==',

  // Set custom APM Server URL (default: http://127.0.0.1:8200)
  serverUrl: 'https://localhost:8200',
  verifyServerCertedit: false
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use('/live',  health.LivenessEndpoint(healthcheck));
app.use('/ready', health.ReadinessEndpoint(healthcheck));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
