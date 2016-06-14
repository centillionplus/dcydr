angular.module('MainCtrl', []).controller('MainController', function($scope, Main, $interval) {

  //set number of voters to a default of 3.  
  $scope.voters = 3;
  // $scope.userVoteYes = null;
  // $scope.userVoteNo = null;

  //Possible voter object:
  // var dcydrObj = { 
  //   voters: $scope.voters,
  //   stateView: view1,
  //   yes: 0,
  //   no: 0,
  //   totalVotes: 3,
  //   allVotesIn: false
  // };

  //---General functionality for listening to stateView and resetting stateView------


  //Listen to any server side changes and update dcydrObj accorgingly
  var listenToServer = function() {
    Main.getState(function(dataResponse) {
      // $scope.data = dataResponse;
    }).then(function(state) {
      dcydrObj = {
        'voters': state.data.voters,
        'stateView': state.data.state,
        'yes': state.data.yes,
        'no': state.data.no,
        'totalVotes': state.data.totalVotes,
        'allVotesIn': state.data.allVotesIn
      };
    });
  };

  //Call listenToServer on a setInterval of 500ms.  
  var beginApp = $interval(listenToServer, 500);

  beginApp();


  //Reset stateView - visible on views 2a - 3
  $scope.reset = function() {
    //Confirm pop-up
    var confirmReset = confirm('Are you sure you want to reset?');
    if (confirmReset) {
      //Reset number of voters to 3 (default)
      $scope.voters = 3;
      //Reset dcydr object to 
      dcydrObj = { 
        voters: $scope.voters,
        stateView: 1,
        yes: 0,
        no: 0,
        totalVotes: 0,
        allVotesIn: false
      };
      //API call to reset state on server
      Main.resetState(function() {
        
      });
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
  $scope.go = function() {
    Main.startVoting({'voters': $scope.voters}).
      catch(function (err) {
        console.log(err);
      });
  };

//---view2a------------------------------------------------------

  //Take user vote input and post to server - called when user clicks Y/N on view2a.html
  $scope.postVoteYes = function() {
    Main.addVoteYes().
      catch(function (err) {
        console.log(err);
      });
  };

  $scope.postVoteNo = function() {
    Main.addVoteNo().
      catch(function (err) {
        console.log(err);
      });
  };

//---view2b------------------------------------------------------

//---view3-------------------------------------------------------





});