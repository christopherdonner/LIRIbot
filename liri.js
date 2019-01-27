require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require('request');
var spotify = new Spotify(keys.spotify);