var server = require('../server.js');

//this contains and modifies the vote session obj
module.exports = {
    
  //current view
  stateView: 1,

  //# of yes votes
  yes: 0,

  //# of no votes
  no: 0,

  //total votes expected
  totalVotes: 3,

  //tracks when all votes are in
  allVotesIn: false,

  //result of voting session: strings 'yes','no',or 'tie'
  result: null,


  //adds yes vote and checks for result
  voteYes: function () {
    //increment yes
    this.yes++;
    this.checkResult();
  },

  //adds no vote checks for result
  voteNo: function () {
    //increment no
    this.no++;
    this.checkResult();
  },

  //check result
  checkResult: function () {
    //see if all votes are in
    if (this.yes + this.no === this.totalVotes) {
      //all votes are in!
      this.allVotesIn = true;
      //check for a winner
      if (this.yes > this.no) {
        //set result
        this.result = 'yes';
      } else if (this.yes < this.no) {
        //set result
        this.result = 'no';
      } else {
        //set result
        this.result = 'tie';
      }
      //change to state 3
      this.changeStateView(3);
    }
  },

  setTotalVotes: function (num) {
    //set votes total
    this.totalVotes = num || 3;
    //set state to 2 using our method below to do so
    this.changeStateView(2);
  },

  //reset the vote session
  voteReset: function () {

    this.stateView = 1;

    //# of yes votes
    this.yes = 0;

    //# of no votes
    this.no = 0;

    //total votes expected
    this.totalVotes = 3;

    //tracks when all votes are in
    this.allVotesIn = false;

    //result of voting session: strings 'yes','no',or 'tie'
    this.result = null;
  },

  // change the stateView and emit it for the client to act upon
  changeStateView: function(viewnum) {
    // actually change the stateView on the object
    this.stateView = viewnum;
    // emit a socket event that the client is listening for, and send it the entire data object here
    server.io.emit('stateViewChange', this);
  }
};