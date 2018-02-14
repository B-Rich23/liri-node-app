// Require apiKeys object from keys.js and save object in a variable
var apiKeys = require("./keys.js");

// Require node packages for Twitter, Spotify, and Request
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Capture the values of the properties in the twitterKeys object in variables
var consumerKey = apiKeys.twitterKeys.consumer_key;
var consumerSecret = apiKeys.twitterKeys.consumer_secret;
var accessToken = apiKeys.twitterKeys.access_token_key;
var accessSecret = apiKeys.twitterKeys.access_token_secret;


 
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessToken,
  access_token_secret: accessSecret
});


// Capture the values of the properties in the spotifyKeys object in variables
var clientId = apiKeys.spotifyKeys.client_id;
var clientSecret = apiKeys.spotifyKeys.client_secret;

var spotify = new Spotify({
  id: clientId,
  secret: clientSecret
});



// Read in the command line arguments
var cmdArgs = process.argv;

// The LIRI command will always be the second command line argument
var liriCommand = cmdArgs[2];
var liriCommandDetail = cmdArgs[3];
// var liriCommandDetail2 = cmdArgs[4];
// var liriCommandDetail3 = cmdArgs[5];

// The parameter to the LIRI command may contain spaces
var liriArg = '';
for (var i = 3; i < cmdArgs.length; i++) {
	liriArg += cmdArgs[i] + ' ';
}

 //Parameters for Twitter API call 
var params = {screen_name: 'RichRich1032', count: 20};

// Helper function to retrieve last 20 tweets
function retrieveTweets() {
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
			}

		}

	})
};

// Song for Spotify API call
var userInput = liriCommandDetail;
// var artist = liriCommandDetail2
// var movie = liriCommandDetail2

// Helper function to retrieve spotify song info
function retrieveSongInfo () {
		spotify.search({ type: 'track', query: '' + userInput + '', limit: 1}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		console.log(data.tracks.items[0].album.artists[0].name); 
		// console.log(data.tracks.items); 
		console.log(data.tracks.items[0].name); 
		console.log(data.tracks.items[0].preview_url); 
		console.log(data.tracks.items[0].album.name); 
		});

  // .then(function(response) {
  //   console.log(response);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // };
}

// Helper function to display default spotify song info
function defaultSongInfo () {
		spotify.search({ type: 'track', query: 'the sign', limit: 1}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		console.log(data.tracks.items[0].album.artists[0].name); 
		// console.log(data.tracks.items); 
		console.log(data.tracks.items[0].name); 
		console.log(data.tracks.items[0].preview_url); 
		console.log(data.tracks.items[0].album.name); 
		});

  // .then(function(response) {
  //   console.log(response);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // };
}

// Helper function to display OMDB movie info
function retrieveMovieInfo() {
		request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		  // If there were no errors and the response code was 200 (i.e. the request was successful)...
		  if (!error && response.statusCode === 200) {

			    // Then we print out the imdbRating
			    console.log(JSON.parse(body).Title);
			    console.log(JSON.parse(body).Year);
			    console.log(JSON.parse(body).imdbRating);
			    console.log(JSON.parse(body).Ratings[1].Source + ' ' + JSON.parse(body).Ratings[1].Value);
			    console.log(JSON.parse(body).Country);
			    console.log(JSON.parse(body).Language);
			    console.log(JSON.parse(body).Plot);
			    console.log(JSON.parse(body).Actors);
			  }
		});
}


// Helper function to display default OMDB movie info
function defaultMovieInfo() {
		request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		  // If there were no errors and the response code was 200 (i.e. the request was successful)...
		  if (!error && response.statusCode === 200) {

			    // Then we print out the imdbRating
			    console.log(JSON.parse(body).Title);
			    console.log(JSON.parse(body).Year);
			    console.log(JSON.parse(body).imdbRating);
			    console.log(JSON.parse(body).Ratings[1].Source + ' ' + JSON.parse(body).Ratings[1].Value);
			    console.log(JSON.parse(body).Country);
			    console.log(JSON.parse(body).Language);
			    console.log(JSON.parse(body).Plot);
			    console.log(JSON.parse(body).Actors);
			  }
		});
}

// Liri commands
if (liriCommand === 'my-tweets') {
	retrieveTweets();
};

if (liriCommand === 'spotify-this-song' && userInput !=="") {
	retrieveSongInfo();
}
else if (liriCommand === 'spotify-this-song' && userInput == "") {
	defaultSongInfo();
};

if (liriCommand === 'movie-this' && userInput !=="") {
	retrieveMovieInfo();
}
else if (liriCommand === 'movie-this' && userInput == "") {
	defaultMovieInfo();
};

if (liriCommand === 'do-what-it-says') {
	retrieveTweets();
}


defaultMovieInfo();