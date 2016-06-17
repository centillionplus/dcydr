angular.module('MainCtrl', [])
.controller('MainController', function($scope, Main, $interval, $location, $timeout) {

  $scope.viewToRouteConverter = {
    2: '/view2a',
    3: '/view3'
  };
  //Listen to any server side changes via the socket, and update $scope.dcydrObj accorgingly
  Main.socket.on('news', function(data) {
    console.log("data in socket.on(news) on CLIENT: ", data);
    $scope.dcydrObj = {
        'stateView': data.stateView,
        'yes': data.yes,
        'no': data.no,
        'totalVotes': data.totalVotes,
        'allVotesIn': data.allVotesIn,
        'result': data.result
      };
    // change the route if appropriate
    var rerouteTo = $scope.viewToRouteConverter[data.stateView];
    console.log("rerouteTo: ", rerouteTo);
    console.log("$location: ", $location);
    $location.path(rerouteTo);
    $scope.$apply();
  });


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