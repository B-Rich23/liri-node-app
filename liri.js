// Require apiKeys object from keys.js and save object in a variable
var apiKeys = require("./keys.js");

// Require node packages for Twitter, Spotify, Request, and fs
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


// Capture the values of the properties in the twitterKeys object in variables
var consumerKey = apiKeys.twitterKeys.consumer_key;
var consumerSecret = apiKeys.twitterKeys.consumer_secret;
var accessToken = apiKeys.twitterKeys.access_token_key;
var accessSecret = apiKeys.twitterKeys.access_token_secret;


// Caputure value of new Twitter object in variable
var client = new Twitter({
	  consumer_key: consumerKey,
	  consumer_secret: consumerSecret,
	  access_token_key: accessToken,
	  access_token_secret: accessSecret
});


// Capture the values of the properties in the spotifyKeys object in variables
var clientId = apiKeys.spotifyKeys.client_id;
var clientSecret = apiKeys.spotifyKeys.client_secret;

// Caputure value of new Spotify object in variable
var spotify = new Spotify({
	  id: clientId,
	  secret: clientSecret
});


// Read in the command line arguments
var cmdArgs = process.argv;

// The LIRI command will always be the second command line argument
var liriCommand = cmdArgs[2];

// The LIRI commandDetail will always be the third command line argument
var liriCommandDetail = cmdArgs[3];

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
				// Print most redent 20 tweets
				console.log(tweets[i].text);

				// Print dates the most 20 recent tweets were created
				console.log(tweets[i].created_at);
			}

		}

	})
};

// Song for Spotify API call
var userInput = liriCommandDetail;

// Helper function to retrieve Spotify song info
function retrieveSongInfo () {
		spotify.search({ type: 'track', query: '' + userInput + '', limit: 1}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
	
		// Print the artist's name
		console.log(data.tracks.items[0].album.artists[0].name); 
		// Print the song's name
		console.log(data.tracks.items[0].name);
		// Print the preview link of the song from Spotify
		console.log(data.tracks.items[0].preview_url);
		// Print the album that the song is from
		console.log(data.tracks.items[0].album.name); 
		});
}

// Helper function to display default Spotify song info
function defaultSongInfo () {
		spotify.search({ type: 'track', query: 'the sign ace of base', limit: 20}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		// Print the artist's name
		console.log(data.tracks.items[0].album.artists[0].name); 
		// Print the song's name
		console.log(data.tracks.items[0].name);
		// Print the preview link of the song from Spotify
		console.log(data.tracks.items[0].preview_url);
		// Print the album that the song is from
		console.log(data.tracks.items[0].album.name); 
		});
}

// Helper function to retrieve Spotify song info from random.txt
function retrieveSongRandom () {
		spotify.search({ type: 'track', query: '' + random2 + '', limit: 1}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		// Print the artist's name
		console.log(data.tracks.items[0].album.artists[0].name); 
		// Print the song's name
		console.log(data.tracks.items[0].name);
		// Print the preview link of the song from Spotify
		console.log(data.tracks.items[0].preview_url);
		// Print the album that the song is from
		console.log(data.tracks.items[0].album.name); 
		});
}


// Helper function to display OMDB movie info
function retrieveMovieInfo() {
		request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		  // If there were no errors and the response code was 200 (i.e. the request was successful)...
		  if (!error && response.statusCode === 200) {

			    // Print out the Title
			    console.log(JSON.parse(body).Title);
			    // Print out the Year movie was released
			    console.log(JSON.parse(body).Year);
			    // Print out the imdbRating
			    console.log(JSON.parse(body).imdbRating);
			    // Print out the Rotten Tomatoes Rating
			    console.log(JSON.parse(body).Ratings[1].Source + ' ' + JSON.parse(body).Ratings[1].Value);
			    // Print out the Country
			    console.log(JSON.parse(body).Country);
			    // Print out the Language
			    console.log(JSON.parse(body).Language);
			    // Print out the Plot
			    console.log(JSON.parse(body).Plot);
			    // Print out the Actors
			    console.log(JSON.parse(body).Actors);
			  }
		});
}

// Helper function to display default OMDB movie info
function defaultMovieInfo() {
		request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		  // If there were no errors and the response code was 200 (i.e. the request was successful)...
		  if (!error && response.statusCode === 200) {

			    // Print out the Title
			    console.log(JSON.parse(body).Title);
			    // Print out the Year movie was released
			    console.log(JSON.parse(body).Year);
			    // Print out the imdbRating
			    console.log(JSON.parse(body).imdbRating);
			    // Print out the Rotten Tomatoes Rating
			    console.log(JSON.parse(body).Ratings[1].Source + ' ' + JSON.parse(body).Ratings[1].Value);
			    // Print out the Country
			    console.log(JSON.parse(body).Country);
			    // Print out the Language
			    console.log(JSON.parse(body).Language);
			    // Print out the Plot
			    console.log(JSON.parse(body).Plot);
			    // Print out the Actors
			    console.log(JSON.parse(body).Actors);
			  }
		});
}

// Helper function to display OMDB movie info from random.txt
function retrieveMovieRandom() {
		request("http://www.omdbapi.com/?t=" + random2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		  // If there were no errors and the response code was 200 (i.e. the request was successful)...
		  if (!error && response.statusCode === 200) {

			    // Print out the Title
			    console.log(JSON.parse(body).Title);
			    // Print out the Year movie was released
			    console.log(JSON.parse(body).Year);
			    // Print out the imdbRating
			    console.log(JSON.parse(body).imdbRating);
			    // Print out the Rotten Tomatoes Rating
			    console.log(JSON.parse(body).Ratings[1].Source + ' ' + JSON.parse(body).Ratings[1].Value);
			    // Print out the Country
			    console.log(JSON.parse(body).Country);
			    // Print out the Language
			    console.log(JSON.parse(body).Language);
			    // Print out the Plot
			    console.log(JSON.parse(body).Plot);
			    // Print out the Actors
			    console.log(JSON.parse(body).Actors);
			  }
		});
}

var random1;
var random2;

// Helper function to read from the "random.txt" file.
function readDoc() {
		fs.readFile("random.txt", "utf8", function(error, data) {

		    // If the code experiences any errors it will log the error to the console.
		    if (error) {
		        return console.log(error);
		    }

		    // Split the data by commas (to make it more readable) and save value as an array
		    var dataArr = data.split(",");

		    // Capture dataArr index values as variables
		    random1 = dataArr[0];
		    random2 = dataArr[1];

		    // Call function processFile to define variables from asynchronous callback
		    processFile();


		});
}

// Helper function definesvariables from asynchronous callback and executes liri commands 
function processFile() {
		    if (random1 === 'my-tweets') {
				liriCommand === 'my-tweets';
				retrieveTweets();
			}

			else if (random1 === 'spotify-this-song') {
				liriCommand === random1;
				liriCommandDetail === random2;
				retrieveSongRandom();
			}

			else if (random1 === 'movie-this') {
				liriCommand === 'movie-this';
				liriCommandDetail === random2;
				retrieveMovieRandom();
			}


}

// Liri commands
if (liriCommand === 'my-tweets') {
	retrieveTweets();
};

if (liriCommand === 'spotify-this-song' && userInput !== undefined) {
	retrieveSongInfo();
}
else if (liriCommand === 'spotify-this-song' && userInput == undefined) {
	defaultSongInfo();
};

if (liriCommand === 'movie-this' && userInput !== undefined) {
	retrieveMovieInfo();
}
else if (liriCommand === 'movie-this' && userInput == undefined) {
	defaultMovieInfo();
};

if (liriCommand === 'do-what-it-says') {
	readDoc();
};




