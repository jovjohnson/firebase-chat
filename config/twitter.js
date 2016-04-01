'use strict';

var Twitter = require('twitter');
var Firebase = require('firebase');

var ref = new Firebase('https://jovvis-cool-app.firebaseio.com/');
var tweetRef = ref.child('tweet');


// ref.createUser({
// 	email:
// 	password:
// })

// var client = new Twitter({
// 	consumer_key: process.env.TWITTER_API_KEY,
// 	consumer_secret: process.env.TWITTER_API_SECRET,
// 	access_token_key: process.env.TWITTER_ACCESS_TOKEN,
// 	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

// client.stream('statuses/filter', {track: 'san antonio'}, function(stream) {
// 	stream.on('data', function(tweet) {
// 		console.log(tweet.user.screen_name, tweet.text);
// 		tweetRef.push(tweet);
// 	});

// 	stream.on('error', function(error) {
// 		console.log(error);
// 	});
// });

// tweetRef.on('child_added', function(snapshot) {
// 	var newTweet = snapshot.val();
// })