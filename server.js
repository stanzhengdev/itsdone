var express = require('express');
var app = express();
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var moment = require('moment');

var configDB = require('./config/database.js');

require('./config/passport')(passport); // pass passport for configuration

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


module.exports = function (redisClient, redisPublishClient, connections) {
  app.set('redisClient', redisClient);
  app.set('redisPublishClient',redisPublishClient);
  app.set('connections', connections);
  app.set('view engine', 'ejs');
  app.set('views', 'app/views');

  // parse application/x-www-form-urlencoded
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());
  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
  };
  app.use(allowCrossDomain);
    // required for passport
  app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  // routes ======================================================================
  require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

  // launch ======================================================================

  //Include the client files as well.
  app.use(express.static(__dirname + '/client/app/www'));


  return app;
};
