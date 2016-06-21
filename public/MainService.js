angular.module('MainService', [])
.factory('Main', ['$http', '$location', function($http, $location) {

  return {

    // create the socket variable to be used to emit and listen in the controller
    // NOTE: for running on heroku (the deployed version), we'll need the socket to look there
    socket: io('https://dcydr.herokuapp.com'),

    // IF INSTEAD you're running your app locally, just comment out the line above and uncomment the line below. Remember to switch it back before commiting!
    // socket: io('localhost:3000'),


    viewToRouteConverter: {
      1: '/view1',
      2: '/view2',
      3: '/view3'
    },

    // When we need to update the view
    updateView: function(stateView) {
      // Get the route from the route converter object
      var rerouteTo = this.viewToRouteConverter[stateView];
      // Set the location to be this route
      $location.path(rerouteTo);
    },

    //call to get state
    getState: function() {
      return $http.get('/api/vote');
    },

    //used from view1, sends number of voters and starts the voting (sets vote to view2)
    startVoting: function(voterData) {
      return $http.post('/api/vote', voterData);
    },

    //sends a Yes vote
    addVoteYes: function(vote) {
      return $http({
        method: 'POST',
        url: '/api/vote/yes',
        data: vote
      });
    },

    //sends a No vote
    addVoteNo: function(vote) {
      return $http({
        method: 'POST',
        url: '/api/vote/no',
        data: vote
      });
    },

    //Cancel/Reset - sends a message for server to reset the object
    resetState: function() {
      //returns a reset voteData object
      return $http.post('api/vote/reset/');
    },

    // Don't think we need a delete just yet.  But just in case...
    delete: function() {
      return $http.delete('/api/vote/');
    }
  };       
}])

.run(function(Main, $location) {
  Main.getState().then(function (state) {
    Main.updateView(state.data.stateView);
  });
});
