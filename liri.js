// Require twitterKeys object from keys.js and save object in a variable
var tweetKeys = require("./keys.js");

// Capture the values of the properties in the tweetKeys object in variables
var consumerKey = tweetKeys.consumer_key;
var consumerSecret = tweetKeys.consumer_secret;
var accessToken = tweetKeys.access_token_key;
var accessSecret =tweetKeys.access_token_secret;

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessToken,
  access_token_secret: accessSecret
});
 
var params = {screen_name: 'RichRich1032'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (i = 0; i < tweets.length; i++) {
  		console.log(tweets[i].text);
  		console.log(tweets[i].created_at);
  	}
    
  }
});
