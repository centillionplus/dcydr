// var http = require('./config/http.js');
var voteSession = require('../votes/voteCtrl.js');

module.exports = function(app) {

  //main vote route 
  app.route('/')
    //get voting session obj
    .get(function(req, res) {
      res.send(voteSession);
    });

  // app.route('/yes')
  //   //handle yes vote
  //   .post(res.send('post /yes'));

  // app.route('/no')
  //   //handle no vote
  //   .post(res.send('post /no'));

  // app.route('/reset')
  //   //handle reset/cancel request
  //   .post(res.send('post /reset'));
};