var http = require('');

module.exports = function(app) {

  //main vote route 
  app.route('/')
    //get voting session obj
    .get();

  app.route('/yes')
    //handle yes vote
    .post();

  app.route('/no')
    //handle no vote
    .post();

  app.route('/reset')
    //handle reset/cancel request
    .post();
};