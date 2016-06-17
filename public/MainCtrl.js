angular.module('MainCtrl', [])
.controller('MainController', function($scope, Main, $interval, $location, $timeout) {

  // Voter object set up:
  $scope.dcydrObj = { 
    stateView: 1,
    yes: 0,
    no: 0,
    totalVotes: 3,
    allVotesIn: false,
    result: null
  };

  //Set number of voters to a default of 3.  
  $scope.voters = 3;
  //For displaying user's vote on view3
  $scope.userVote = null;

  //---General functionality for listening to stateView and redirecting upon changes------
  
  //Listen to any server-side stateView changes via the socket, and update $scope.dcydrObj accorgingly
  Main.socket.on('news', function(data) {
    // Update the voter object to reflect the new data
    $scope.dcydrObj = data;
    // Change the route as appropriate
    $scope.updateView(data.stateView);
    // This line seems to be needed to make sure all clients update appropriately:
    $scope.$apply();
  });

  // Object to convert the raw stateView number to the appropriate route
  $scope.viewToRouteConverter = {
    1: '/view1',
    2: '/view2a',
    3: '/view3'
  };

  // When we need to update the view
  $scope.updateView = function(stateView) {
    // Get the route from the route converter object
    var rerouteTo = $scope.viewToRouteConverter[stateView];
    // Set the location to be this route
    $location.path(rerouteTo);
  };


  //Reset stateView - visible on views 2a - 3
  $scope.reset = function() {
    //Confirm pop-up
    if (confirm('Are you sure you want to reset?')) {
      //Reset number of voters to 3 (default)
      $scope.voters = 3;
      //Reset dcydr object to 
      $scope.dcydrObj = { 
        // voters: $scope.voters,
        stateView: 1,
        yes: 0,
        no: 0,
        totalVotes: $scope.voters,
        allVotesIn: false,
        result: null
      };
      //API call to reset state on server
      Main.resetState()
      .then(
        //Reset view to view1
        $scope.updateView(1)
      );
    }
  };


//---view1-------------------------------------------------------

  //When '+' is clicked on view1, $scope.voters is changed accordingly  
  $scope.incNumOfVoters = function() {
    //Set max number of voters to 15 for now.  This may change..
    if ($scope.voters < 15) {
      $scope.voters += 1;
    }
  };

  //When '-' is clicked on view1, $scope.voters is changed accordingly  
  $scope.decNumOfVoters = function() {
    //Min number of voters is 1 - for now..
    if ($scope.voters > 1) {
      $scope.voters -= 1;
    }
  };

  //Initiated when user hits 'go'.  take in number of votes from view1.  
  //Once one user hits go, all users views will switch to v2a.  That is handled via sockets
  $scope.go = function() {
    Main.startVoting({'votes': $scope.voters}).
      catch(function (err) {
        console.log(err);
      });
  };

//---view2a------------------------------------------------------

  //Take user vote input and post to server - called when user clicks Y/N on view2a.html
  //Clicking Y or N has href to view 2b?
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

//---view2b------------------------------------------------------

  //$scope.userVote should be set in view2a to Yes or No. 

  //Listener for server for result is in $scope.listenToServer function.  When result comes in, view changes to view3


//---view3-------------------------------------------------------

  //show $scope.result (var listed above)
  //Only the reset function/button is available on view3


});