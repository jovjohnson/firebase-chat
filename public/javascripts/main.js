'use strict';


var app = angular.module('fireApp', ['firebase']);

app.controller('mainCtrl', function($scope, $tweets, $authObj, ProfileFactory) {
	$scope.tweets = $tweets;
	$scope.authObj = $authObj;

	$scope.authObj.$onAuth(function(authData) {
		console.log('authData:', authData);
		$scope.authData = authData;
		$scope.profile = ProfileFactory(authData.uid);
	});

	$scope.logout = function() {
		$scope.authObj.$unauth();
	}

	$scope.register = function(user) {
		$scope.authObj.$createUser(user)
		.then(function(userData) {
			console.log('user created:', userData);
			return $scope.authObj.$authWithPassword(user);
		})
		.then(function(authData) {
			console.log('user logged in:', authData);
		})
		.catch(function(err) {
			console.log('error:', err);
		});

	};

	$scope.login = function(user) {
		$scope.authObj.$authWithPassword(user)
		.then(function(authData) {
			console.log('user logged in:', authData);
		})
		.catch(function(err){
			console.log('err:', err);
		});
	};

});

app.constant('FB_URL', 'https://chattered.firebaseio.com/');

app.factory('ProfileFactory', function($firebaseObject, $firebaseArray, FB_URL) {
	return function(uid) {
		if(!uid) {
			return {};
		};
		
		var profilesRef = new Firebase(FB_URL + 'profiles');
		var userRef = profilesRef.child(uid);
		var users = $firebaseArray(userRef);

		var Users = {
  		getProfile: function(uid){
    		return $firebaseObject(usersRef.child(uid));
  		},
  		getDisplayName: function(uid){
    		return users.$getRecord(uid).displayName;
  		},

  		all: users
		};

		console.log(Users);

		return $firebaseObject(userRef);
	};
});


app.factory('Messages', function($firebaseArray, FB_URl, ProfileFactory){
  
  var messagesRef = new Firebase(FirebaseUrl+'messages');

        return $firebaseArray(messagesRef);
    };
  });








app.factory('$authObj', function($firebaseAuth, FB_URL) {
	var ref = new Firebase(FB_URL);
	return $firebaseAuth(ref);
});

app.factory('$tweets', function($firebaseArray, FB_URL) {
	var ref = new Firebase(FB_URL);
	var tweetsRef = ref.child('tweet');
	return $firebaseArray(tweetsRef);
});

// ref.child('tweets').on('child_added', function(snapshot) {
// 	var newTweet = snapshot.val();
	
// 	var $tweet = $('#template').clone();
// 	$tweet.removeAttr('id');
	
// 	$tweet.find('.text').text(newTweet);

// 	$('#tweets').prepend($tweet);
// })