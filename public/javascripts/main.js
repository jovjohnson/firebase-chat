'use strict';


var app = angular.module('fireApp', ['firebase']);

app.controller('mainCtrl', function($scope, $messages, $authObj, ProfileFactory) {
	$scope.authObj = $authObj;
	$scope.messages = $messages;

  var ref = new Firebase('https://chattered.firebaseio.com/');


	$scope.send = function(post) {
		console.log('ksdjls');
		post.time = Date.now();
		var msgRef = ref.child('messages');
		msgRef.push(post);

	}

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


app.factory('$messages', function($firebaseArray, FB_URL){
  var ref = new Firebase(FB_URL);
  var msgRef = ref.child('messages');
  	return $firebaseArray(msgRef);
});


app.factory('$authObj', function($firebaseAuth, FB_URL) {
	var ref = new Firebase(FB_URL);
	return $firebaseAuth(ref);
});

// app.factory('$tweets', function($firebaseArray, FB_URL) {
// 	var ref = new Firebase(FB_URL);
// 	var tweetsRef = ref.child('tweet');
// 	return $firebaseArray(tweetsRef);
// });

app.constant('FB_URL', 'https://chattered.firebaseio.com/');


// ref.child('tweets').on('child_added', function(snapshot) {
// 	var newTweet = snapshot.val();
	
// 	var $tweet = $('#template').clone();
// 	$tweet.removeAttr('id');
	
// 	$tweet.find('.text').text(newTweet);

// 	$('#tweets').prepend($tweet);
// })