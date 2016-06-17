var express = require('express');
var middleware = require('./config/middleware.js');
var socketio = require('socket.io');


var app = express();


//SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = 3000;

// Save server as a variable in order to reuse the HTTP server created with express for socket.io
var server = app.listen(PORT);
console.log('DCYDR listening' + PORT);

// Create the socket variable by passing in the HTTP server we saved above
// var io = socketio.listen(server);
var io = socketio(server);



// Set up the websocket
// io.sockets.on('connection', function(socket) {
io.on('connection', function(socket) {
  // socket.emit('news', {hello: 'world'});
  socket.on('changeState', function(data) {
    console.log("data in socket.on(changeState) on SERVER: ", data);
  });
});

module.exports.app = app;
module.exports.io = io;
