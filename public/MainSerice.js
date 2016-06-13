angular.module('MainService', []).factory('Main', ['$http', function($http) {

  return {
    // call to get all votes
    get: function() {
      return $http.get('/api/votes');
    },


    // these will work when more API routes are defined on the Node side of things
    // call to POST and add a new vote
    create: function(voteData) {
      return $http.post('/api/votes', voteData);
    },

    // Don't think we need a delete just yet.  But just in case...
    delete: function(id) {
      return $http.delete('/api/votes/' + id);
    }
  };       

}]);