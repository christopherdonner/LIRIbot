require("dotenv").config();

var fs = require("fs");
var axios = require("axios");

var spotifyAuth = require("./keys.js")

var Spotify = require('node-spotify-api');
var request = require('request');


//var spotify = new Spotify(keys.spotify);

console.log(process.argv[2]);
var action=process.argv[2].toLowerCase().trim();
console.log(action)

/*
concert-this
spotify-this-song
movie-this
do-what-it-says
*/

if(action==="movie-this"){
  if(process.argv[3])
  {
    var title=[]

    for(i=3;i<process.argv.length;i++)
      {
        title.push(process.argv[i])
      }
    console.log(title)
    // axios.get(`http://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`).then(
    //   function(response) 
    //   {
    //     // Then we print out the imdbRating
    //     console.log(response.data);
    //   });
    request(`http://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`, function(error, response, body){
        console.log(body)
        var omdbResponse=JSON.parse(body)
        console.log(omdbResponse)
        console.log(omdbResponse.Title)
    })
  }
}

fs.readFile("random.txt", "utf8", function(error, data)
{

})