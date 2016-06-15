var routes = require('./routes.js');
var bodyParser = require('body-parser');




module.exports = function (app, express) {
  
  //use express router mini-app
  var voteRouter = express.Router();

  //parse json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //serve index
  app.use(express.static(__dirname + '/../../public'));

  //inject routes into Router
  routes(voteRouter);

  //use router for all vote requests
  app.use('/api/vote', voteRouter);
};
