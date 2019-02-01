require("dotenv").config();

var fs = require("fs");

var spotifyAuth = require("./keys.js")

var Spotify = require('node-spotify-api');
var spotify = require('spotify');
var request = require('request');

var http = require("http");

var logLine = ""


//var spotify = new Spotify(keys.spotify);
var term = []

var action = process.argv[2].toLowerCase().trim();
console.log(action)

function writeLog() {
  fs.appendFile("log.txt", `\n${logLine}\n`, function (err) {
  })
  logLine = ""
}

if (action === "movie-this") {
  movieThis()
}
else if (action === "concert-this") {
  concertThis()
}
else if (action === "spotify-this") {
  spotifyThis()
}
else if (action === "do-what-it-says") {
  doWhatItSays()
}
else {
  console.log("sorry, I can't help you with that.")
}

//I had a LOT of trouble with the Spotify authentication. 
//I was able to get the code but when exchanging for the auth token I get http 400 
//and I cannot figure out why.

//Ultimately I started getting a HTTP 415: Invalid Media error, which I also can neither explain nor resolve :(


//search term input

for (i = 3; i < process.argv.length; i++) {
  //artist=artist+`${artist}%20`
  term.push(process.argv[i])
}
console.log(action)
console.log(term)
//spotify-this


function spotifyThis() {
  // var http = require("http");


 

  // var spotify = new Spotify({
  //   id: spotifyClientID,
  //   secret: spotifyClientSecret
  // });

  spotify.search({ type: 'track', query: term }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
  // // http.createServer(function(request, response) {
  // //     response.writeHead(200, {"Content-Type": "text/plain"});
  // //     response.write("works");
  // //     response.end();
  // //   }).listen(8888);

  //   request(`https://accounts.spotify.com/authorize?client_id=${spotifyClientID}&response_type=code&redirect_uri=${redirectURI}`, function(error, response, body){
  //   if(error){console.log(error)}  
  //   console.log(response)
  //   // var spotifyAuthResponse=JSON.parse(response)
  //   console.log(response.code)

  // spotify.search({ type: 'track', query: track }, function(err, data) {
  //   if ( err ) {
  //       console.log('Error occurred: ' + err);
  //       return;
  //   }
  //   console.log(data)
  // })
  var body = JSON.stringify({
    client_id: spotifyClientID,
    client_secret: spotifyClientSecret,
    code: spotifyCode,
    grant_type: 'authorization_code',
    redirect_uri: 'http%3A%2F%2Flocalhost%3A8888%2Fcallback'
  });

  var postBody = {
    url: 'https://todoist.com/oauth/access_token',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Authorization: Basic NTA1ZGI2NzNmNDA2NDcwZmJhYjFlYzExZjQ3YzYwZWY=:NDA0Zjk1YTUxZmU3NDQ1Mzk3MWI5NmUyMjIzOGE4NzE='
    }
  };

  request.post(postBody, function (error, response, body) {
    console.log(body)
    console.log(response)
    if (error) {
      console.log(error)
    }
  });
  //I am able to get the Code but consistently get an http 400 when attempting to get the token

}

//the concert-this events URI is giving me an empty array response.
//so I have fallen back to the /artists/ endpoint

//concert-this
function concertThis() {
  if (process.argv[3]) {
    var artistArray = []

    for (i = 3; i < process.argv.length; i++) {
      //artist=artist+`${artist}%20`
      artistArray.push(process.argv[i])
      var artist = artistArray.join("+")
    }
    console.log(artist)
    request(`https://rest.bandsintown.com/artists/${artist}?app_id=codingbootcamp`, function (error, response, body) { // the /events/ endpoint is returning http 200 w/ empty array (!!?!?!??)
      if (error) {
        console.log(error)
        return;
      }
      console.log(body)
      // console.log(response)
      var bandsResponse = JSON.parse(body)
      console.log(`URL: ${bandsResponse.url}\nUpcoming Event Count: ${bandsResponse.upcoming_event_count}`)
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
  logLine = `${action}: ${artist}`
  console.log(`logLine: ${logLine}`)
  writeLog();
}

//move-this
function movieThis() {
  if (process.argv[3]) {
    var title = []

    for (i = 3; i < process.argv.length; i++) {
      title.push(process.argv[i])
    }
    // console.log(title)
    request(`http://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`, function (error, response, body) {
      var omdbResponse = JSON.parse(body);
      // console.log(omdbResponse);
      console.log(`Title: ${omdbResponse.Title}\nReleased: ${omdbResponse.Released}\nIMDB Rating: ${omdbResponse.Ratings[0]}\nRotten Tomatoes: ${omdbResponse.Ratings[1]}\nCountry: ${omdbResponse.Country}\nLanguage: ${omdbResponse.Language}\nPlot: ${omdbResponse.Plot}`);

      logLine = `${action}: ${title} => ${omdbResponse.Title}`
      writeLog();
    })
  }
}
//do-what-it-says
function doWhatItSays() {
  if (action === "do-what-it-says")
    fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data)
      var textCommand = data.split(",")
      console.log(textCommand)
      action = textCommand[0]
      term = textCommand[1]
      if (action === "movie-this") {
        movieThis()
      }
      else if (action === "concert-this") {
        concertThis()
      }
      else if (action === "spotify-this") {
        spotifyThis()
      }
      else if (action === "do-what-it-says") {
        doWhatItSays()
      }
      else {
        console.log("sorry, I can't help you with that.")
      }
    })
}




