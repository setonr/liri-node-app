var twit = require("twit");
var keys = require("./keys.js");
var keyList = keys.twitterKeys;
var T = new twit(keyList);
var request = require("request");
var spotify = require("spotify");
var fs = require("fs");

var command = process.argv[2];
var title = process.argv[3];

if (command === "my-tweets") {
	var params = {
		q: "theabyssgazeswk",
		count: 20
	}

	T.get('search/tweets', params, searchedData);

	function searchedData(err, data, response) {

		for (var i = 0; i < 20; i++) {
			console.log("Date: " + data.statuses[i].created_at);
			console.log("Tweet: " + data.statuses[i].text);
			console.log("====================");
		}
		
	}
	
} else if (command === "spotify-this-song") {
	spotify.search({type: "track", query: title}, function(err, data) {
		if (err) {
			console.log("Error occurred: " + err);
		} else {
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song Title: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		}
		
	});

} else if (command === "movie-this") {
	var movieName = title;
	var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
	//console.log(queryURL);

	request(queryURL, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			//console.log(JSON.parse(body, null, 2));
			console.log("Your Movie Request!")
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Country of Production: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Synopsis: " + JSON.parse(body).Plot);
			console.log("Lead Actors: " + JSON.parse(body).Actors);
			console.log("Read more at Rotten Tomatoes: " + JSON.parse(body).tomatoURL);
		}
	})


} else if (command === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var dataArray = data.split(",");
		command = dataArray[0];
		title = dataArray[1];

		spotify.search({type: "track", query: title}, function(err, data) {
		if (err) {
			console.log("Error occurred: " + err);
		} else {
			console.log("Artist: " + data.tracks.items[0].artists.name);
			console.log("Song Title: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album: " + data.tracks.items[0].album.name);
		}
	});
});

}

