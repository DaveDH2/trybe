/* 
* @Author: justinwebb
* @Date:   2015-05-04 15:12:58
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-11 15:37:30
*/
'use strict';
var config = require('./server-config');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var open = require('open');
var models = require('./models');
var passport = require('passport');
var mysql = require('mysql');

// Configure server
app.use(express.static(config.static_site_root));


// Create tables and start server
models.sequelize.sync()
.done(function(){
  server.listen(config.port, function () {
    console.log('Express server listening on port %d', config.port);
    open( 'http://localhost:' + config.port, function (err) {
      //when deploying to heroku, this will fail because heroku does not have a browser. Since we don't want this to stop
      //our app from running, console log the error and move on
      if (err) {
        console.error(err); 
      } else {
          console.log('App server browser tab is open...');
      }
    });
  });
});

// Configure our server with middleware for routing
require('./routes/middleware.js')(app, express, passport);

// Export our app for testing
module.exports = app;
