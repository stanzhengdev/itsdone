var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var moment = require('moment');

module.exports = function (redisClient, redisPublishClient, connections) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded());
  // parse application/json
  app.use(bodyParser.json());
  // parse application/vnd.api+json as json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  //Include the client files as well.
  app.use(express.static(__dirname + '/client/app/www'));

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

  app.post('/login', function(req, resp) {
    // console.log(req);
    // console.log(req.param('name'));
    var name = req.param('name');
    var password = req.param('password');
    if(!name || !password) {
      resp.send('No username or password given. Please give correct credientials');
      return;
    }

    console.log('Password attempt by: ' + name + ' at: ' + moment() );
    if(password && password == 'letmein') {
      //Add redis key for users
      var userKey = 'user:' + name;
      redisClient.set(userKey, moment(), redis.print);
    }
    connections += 1;
    resp.send({success: true, name: name, id: connections});
  });
  return app;
};
