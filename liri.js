require("dotenv").config();

var fs = require("fs");
var axios = require("axios");

var spotifyAuth = require("./keys.js")

var Spotify = require('node-spotify-api');
var request = require('request');

var logLine=[]

var spotifyClientID="505db673f406470fbab1ec11f47c60ef"
var spotifyClientSecret="404f95a51fe74453971b96e22238a871"


//var spotify = new Spotify(keys.spotify);

console.log(process.argv[2]);
var action=process.argv[2].toLowerCase().trim();
console.log(action)

function writeLog(){
  fs.appendFile("log.txt", logLine, function(err) {
  })
  }

/*
concert-this
spotify-this-song
movie-this
do-what-it-says
*/


//concert-this
if(action==="concert-this"){
  if(process.argv[3])
  {
    var artist=[]

    for(i=3;i<process.argv.length;i++)
      {
        artist.push(process.argv[i])
      }
      console.log(artist[0])
      request(`https://rest.bandsintown.com/artists/${artist[0]}/events?app_id=codingbootcamp`, function(error, response, body){
          console.log(body)
        })
  }
  logLine=`${action}: ${artist}`
  console.log(`logLine: ${logLine}`)
  writeLog();
}

//move-this
if(action==="movie-this"){
  if(process.argv[3])
  {
    var title=[]

    for(i=3;i<process.argv.length;i++)
      {
        title.push(process.argv[i])
      }
    console.log(title)
    request(`http://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`, function(error, response, body){
        console.log(body);
        var omdbResponse=JSON.parse(body);
        console.log(omdbResponse);
        console.log(omdbResponse.Title);
    })
    writeLog();
  }
}

//do-what-it-says
fs.readFile("random.txt", "utf8", function(err, data)
{
  if (err) {
    return console.log(err);
  }
  console.log(data)
})


  // If the code experiences any errors it will log the error to the console.


