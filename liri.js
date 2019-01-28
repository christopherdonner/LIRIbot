require("dotenv").config();

var fs = require("fs");
var axios = require("axios");

var spotifyAuth = require("./keys.js")

var Spotify = require('node-spotify-api');
var request = require('request');

//var spotify = new Spotify(keys.spotify);

console.log(process.argv[2])

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);


fs.readFile("random.txt", "utf8", function(error, data)
{

})