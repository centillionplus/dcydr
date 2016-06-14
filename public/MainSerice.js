angular.module('MainService', []).factory('Main', ['$http', function($http) {

  return {
    //call to get state - on setInterval?
    getState: function() {
      return $http.get('/api/state');
    },

    //used from view1, sends number of voters and starts the voting (sets state to view2a)
    startVoting: function(voterData) {
      return $http.post('/api/state', voterData);
    },

    //sends a Yes or No vote
    addVote: function(vote) {
      return $http({
        method: 'POST',
        url: '/api/state',
        data: vote
      });
    },

    //Cancel/Reset - not sure if this sends an actual reset vote object, or a message for server to reset the object
    resetState: function(resetData) {
      //returns a reset voteData object
      return $http.post('/api/state', resetData);
    },



    // Don't think we need a delete just yet.  But just in case...
    delete: function() {
      return $http.delete('/api/state/');
    }

  };       

}]);