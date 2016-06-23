//vote session obj and methods
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
      //parse number of voters from string to number
      var totalVotes = parseInt(req.body.votes);
      // Send the number of total votes to our method in voteCtrl to handle all that needs to happen
      voteSession.setTotalVotes(totalVotes);
      // Send back our whole data object
      res.send(voteSession);
    });

  app.route('/yes')
    //handle yes vote
    .post(function(req, res) {
      voteSession.voteYes();
      res.send(voteSession);
    });

  app.route('/no')
    //handle no vote
    .post(function(req, res) {
      voteSession.voteNo();
      res.send(voteSession);
    });

  app.route('/reset')
    //handle reset/cancel request
    .post(function(req, res) {
      voteSession.voteReset();
      res.send(voteSession);
    });
};