require("dotenv").config();

var fs = require("fs");

var spotifyAuth = require("./keys.js")

var Spotify = require('node-spotify-api');
var request = require('request');

var http = require("http");

var logLine=""

var spotifyClientID="505db673f406470fbab1ec11f47c60ef"
var spotifyClientSecret="404f95a51fe74453971b96e22238a871"
var redirectURI="http%3A%2F%2Flocalhost%3A8888%2Fcallback"
var spotifyCode="AQBGcvf-DYfjpw8QYlX_wecdw2_9D8pQWcW0SeTjINkj_ceO8Y566NSnz9-qPSkMSZ_br8tS70yQ4NZ_1S6DU9R4JUoCiszJsjXz6X3NUJsb1h7dn93Yz0me-98M4F0NAyIp8NEmaimHxlckoSJCzCATqK5JG_MbxQ-lLed5YBhle-yBVgKrUng3FKOtNUy1eAqEx39Z"

//var spotify = new Spotify(keys.spotify);

var action=process.argv[2].toLowerCase().trim();
console.log(action)

function writeLog(){
  fs.appendFile("log.txt", `${logLine}\n`, function(err) {
  })
  logLine=""
  }

/*
concert-this
spotify-this-song
movie-this
do-what-it-says
*/


//spotify-this
if(action==="spotify-this"){
  var http = require("http");

  http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello World");
      response.end();
    }).listen(8888);

    request(`https://accounts.spotify.com/authorize?client_id=${spotifyClientID}&response_type=code&redirect_uri=${redirectURI}`, function(error, response, body){
    if(error){console.log(error)}  
    console.log(response)
    // var spotifyAuthResponse=JSON.parse(response)
    console.log(response.code)
    })
}

//concert-this
if(action==="concert-this"){
  if(process.argv[3])
  {
    var artist=[]

    for(i=3;i<process.argv.length;i++)
      {
        //artist=artist+`${artist}%20`
        artist.push(process.argv[i])
      }
      console.log(artist)
      request(`https://rest.bandsintown.com/artists/${artist}?app_id=codingbootcamp`, function(error, response, body){
      if(error)
      {
        console.log(error)
        return;
      }    
      console.log(body)
          // console.log(response)
          var bandsResponse=JSON.parse(body)
          console.log(bandsResponse.url)
          // console.log(bandsResponse.url)
            // request(bandsResponse.url, function(error, response, body)
            // {
            //   console.log(response)
            //   console.log(body)
            //   var bandPageResponse=JSON.parse(body)
            //   // console.log(bandPageResponse)
            // })
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
        var omdbResponse=JSON.parse(body);
        console.log(omdbResponse);
        console.log(omdbResponse.Title);
        logLine=`${action}: ${title} => ${omdbResponse.Title}`
        console.log("movie-this finished")
        writeLog();
    })
  }
}

//do-what-it-says
if(action==="do-what-it-says")
fs.readFile("random.txt", "utf8", function(err, data)
{
  if (err) {
    return console.log(err);
  }
  console.log(data)
})


  // If the code experiences any errors it will log the error to the console.


