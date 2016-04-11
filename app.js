var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose       = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session')
// Passport
var passport = require('passport');
var initPassport = require('./passport/init');
// Database
var db = require('./configs/db');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('morgan')('combined'));
app.use(session({ secret: 'influmedia-session-engine', cookie: { maxAge: 60000 }}))
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(db.url);

// Passport API setup
initPassport(passport);

app.use(function(req, res, next) {
  console.log('INFLUMEDIA: %s %s', req.method, req.url);
  next();
});
// Backend routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/register', require('./routes/register'));
app.use('/influencers', require('./routes/influencer'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
