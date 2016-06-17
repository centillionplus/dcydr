// var http = require('./config/http.js');
var voteSession = require('../votes/voteCtrl.js');

module.exports = function(app) {

  //main vote route 
  app.route('/')
    //get voting session obj
    .get(function(req, res) {
      res.send(voteSession);
    })
    //set totalVotes
    .post(function(req, res) {
      console.log("body of post req: ", req.body);
      //parse number of voters
      var voters = parseInt(req.body.votes);
      voteSession.setTotalVotes(voters);
      res.send(201, voteSession);
    });

  app.route('/yes')
    //handle yes vote
    .post(function(req, res) {
      voteSession.voteYes();
      res.send(201, voteSession);
    });

  app.route('/no')
    //handle no vote
    .post(function(req, res) {
      voteSession.voteNo();
      res.send(201, voteSession);
    });

  app.route('/reset')
    //handle reset/cancel request
    .post(function(req, res) {
      voteSession.voteReset();
      res.send(201, voteSession);
    });
};