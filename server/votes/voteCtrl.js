var io = require('../server.js');

//this contains and modifies the vote session obj
module.exports = {

  // dataObj: {

    
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

  // },
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
      //change to state 3
      this.stateView = 3;
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
    }
  },

  setTotalVotes: function (num) {
    //set votes total
    this.totalVotes = num || 3;
    //set state to 2
    this.changeStateView(2);
    // this.stateView = 2;
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

  changeStateView: function(viewnum) {
    // actually change the stateView on the object
    this.stateView = viewnum;
    console.log("inside changeStateView");
    // emit a socket event that the client is listening for
    io.io.emit('news', this);
  }
};