var routes = require('./routes.js');
var bodyParser  = require('body-parser');
var ref = require('../server.js').ref;



module.exports = function (app, express) {
  
  

  //parse json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //serve index
  app.use(express.static(__dirname + '/../../public'));
