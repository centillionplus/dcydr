angular.module('MainService', []).factory('Main', ['$http', function($http) {

  return {
    //call to get state - on setInterval?
    getState: function() {
      return $http.get('/api/vote');
    },

    //used from view1, sends number of voters and starts the voting (sets vote to view2a)
    startVoting: function(voterData) {
      return $http.post('/api/vote', voterData);
    },

    //sends a Yes or No vote
    addVoteYes: function(vote) {
      return $http({
        method: 'POST',
        url: '/api/vote/yes',  //vote/yes or 
        data: vote
      });
    },

    //sends a Yes or No vote
    addVoteNo: function(vote) {
      return $http({
        method: 'POST',
        url: '/api/vote/no',
        data: vote
      });
    },


    //Cancel/Reset - not sure if this sends an actual reset vote object, or a message for server to reset the object
    resetState: function(resetData) {
      //returns a reset voteData object
      return $http.post('/api/vote', resetData);
    },



    // Don't think we need a delete just yet.  But just in case...
    delete: function() {
      return $http.delete('/api/vote/');
    }

  };       

}]);