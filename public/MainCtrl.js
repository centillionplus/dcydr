angular.module('MainCtrl', [])
.controller('MainController', function($scope, Main, $interval, $location) {

  // Stringified defaults obj to copy with JSON parse whenever we need to reset the voter object to defaults
  $scope.dcydrObjDefaults = JSON.stringify({ 
    stateView: 1,
    yes: 0,
    no: 0,
    totalVotes: 3,
    allVotesIn: false,
    result: null
  });

  // The voter object $scope.dcydrObj tracks all the data we need to know, mimics the object the server stores
  // Voter object set initially to defaults (copying the defaults object so the two are not connected):
  $scope.dcydrObj = JSON.parse($scope.dcydrObjDefaults);

  // For displaying user's vote on view3. (Note: we didn't put it in the voter object as a property because it is not on the server's data object)
  $scope.userVote = null;

  //For stting which client started the vote
  $scope.voteStarter = false;

  
  //Listen to any server-side stateView changes via the socket, and update $scope.dcydrObj accorgingly
  Main.socket.on('stateViewChange', function(data) {
    // Update the voter object to reflect the new data
    $scope.dcydrObj = data;
    // Change the route as appropriate
    Main.updateView(data.stateView);
    // This line seems to be needed to make sure all clients update appropriately:
    $scope.$apply();
  });


//---view1-------------------------------------------------------

  // When '+' is clicked on view 1, $scope.dcydrObj.totalVotes is incremented  
  $scope.incNumOfVoters = function() {
    //Set max number of voters to 15 for now.  This may change..
    if ($scope.dcydrObj.totalVotes < 15) {
      $scope.dcydrObj.totalVotes += 1;
    }
  };

  // When '-' is clicked on view 1, $scope.dcydrObj.totalVotes is decremented  
  $scope.decNumOfVoters = function() {
    // Min number of voters is 2 (maybe could be 3?)
    if ($scope.dcydrObj.totalVotes > 2) {
      $scope.dcydrObj.totalVotes -= 1;
    }
  };

  // Initiated when user hits 'Start!'. Takes in number of votes from view 1  
  // Sends POST request to update the server
  // (causes all users views will switch to view 2, handled via sockets)
  $scope.go = function() {
    Main.startVoting({'votes': $scope.dcydrObj.totalVotes}).
      catch(function (err) {
        console.log(err);
      }).then(function(){
        //make this client the vote starter
        $scope.voteStarter = true;
      });
  };

//---view2------------------------------------------------------

  // Takes user vote input and post to server - called when user clicks Y/N on view 2
  $scope.postVoteYes = function() {
    $scope.userVote = 'yes';
    Main.addVoteYes().
      catch(function (err) {
        console.log(err);
      }).then($location.path('/view3'));
  };

  $scope.postVoteNo = function() {
    $scope.userVote = 'no';
    Main.addVoteNo().
      catch(function (err) {
        console.log(err);
      }).then($location.path('/view3'));
  };

  // Reset stateView - visible on view 3 for everyone, and also 2 for the organizer (whoever pressed Start)
  $scope.reset = function() {
    //Confirm pop-up
    if (confirm('Are you sure you want to reset?')) {
      //Reset dcydr object to defaults (copy the defaults object so the two are not connected)
      $scope.dcydrObj = JSON.parse($scope.dcydrObjDefaults);
      //reset voteStarter
      $scope.voteStarter = false;
      //API call to reset state on server
      Main.resetState()
      .then(
        //Reset view to view1
        Main.updateView(1)
      );
    }
  };
});