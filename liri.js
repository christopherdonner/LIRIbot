require("dotenv").config();

var fs = require("fs");
var axios = require("axios");

var spotifyAuth = require("./keys.js")

var Spotify = require('node-spotify-api');
var request = require('request');


//var spotify = new Spotify(keys.spotify);

var action=process.argv[2].toLowerCase().trim();

/*
concert-this
spotify-this-song
movie-this
do-what-it-says
*/
if(action==="do-what-it-says"){}

if(action==="concert-this"){
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
}
if(action==="spotify-this-song"){}

// movie this
if(action==="movie-this"){
  if(process.argv[3])
  {
    var title=[]

    for(i=3;i<process.argv.length;i++)
      {
        title.push(process.argv[i]);
      }
    axios.get(`http://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`).then(
      function(response) 
      {
        console.log(`title: ${response.data.Title}`);
        console.log(`release: ${response.data.Released}`);
        console.log(`imdb rating: ${response.data.imdbRating}`);
        console.log(`rottentomatoes rating: ${response.data.Ratings[1]}`);
        console.log(`Produced in: ${response.data.Country}`);
        console.log(`Language: ${response.data.Langauge}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Actors: ${response.data.Actors}`)
      });
     /*
request(`http://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`, function(error, response){
  console.log(request)
  console.log(body)
  
})
*/
  
}

    else
      {
        title="Mr. Nobody"
        
      }
}

fs.readFile("random.txt", "utf8", function(error, data)
{

})