angular.module('MainCtrl', [])
.controller('MainController', function($scope, Main, $interval, $location, $timeout) {

  // Possible voter object:
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


  //---General functionality for listening to stateView and resetting stateView------

  //Listen to any server side changes and update $scope.dcydrObj accorgingly
  $scope.listenToServer = function() {
    Main.getState()
    .then(function(state) {
      $scope.dcydrObj = {
        'stateView': state.data.stateView,
        'yes': state.data.yes,
        'no': state.data.no,
        'totalVotes': state.data.totalVotes,
        'allVotesIn': state.data.allVotesIn,
        'result': state.data.result
      };
      console.log('TEST IN LISTENER: ', $scope.dcydrObj);
      //If stateView is 2 AND userVote is null
      if ($scope.dcydrObj.stateView === 2 && $scope.userVote === null) {
        //Change path to view2a
        $timeout.cancel($scope.timeout);
        $location.path('/view2a');
      //If stateView is 2
      // } else if ($scope.dcydrObj.stateView === 2) { //for testing..
      // // } else if ($scope.dcydrObj.stateView === 2 && $scope.userVote !== null) {
      //   //Change path to 2b
      //   $location.path('/view2b');
      }
      //If allVotesIn is true
      if ($scope.dcydrObj.result) {
        $timeout.cancel($scope.timeout);

        //make $scope.result show the result
        $scope.result = $scope.dcydrObj.result;
        //Change view to 3
        $location.path('/view3'); 
      }
      $scope.timeout = $timeout($scope.listenToServer, 1000);
    });
  };

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // Client no longer needs to listen to the server, as the server communicates directly via sockets.
// // Old way we were having client listen regularly for changes (un-comment to turn on):
// $scope.timeout = $timeout($scope.listenToServer, 1000);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  //Reset stateView - visible on views 2a - 3
  $scope.reset = function() {
    //Confirm pop-up
    if (confirm('Are you sure you want to reset?')) {
      //Reset number of voters to 3 (default)
      $scope.voters = 3;
      //Reset dcydr object to 
      $scope.dcydrObj = { 
        voters: $scope.voters,
        stateView: 1,
        yes: 0,
        no: 0,
        totalVotes: 0,
        allVotesIn: false
      };
      //API call to reset state on server
      Main.resetState()
      .then(
        //Reset view to view1
        $location.path('/view1'));
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
  //Once one user hits go, all users views will switch to v2a.  That is handled in $scope.listenToServer
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