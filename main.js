$(document).ready(function(){

  // get Twitch data
  var users = ["adafruit", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "pioslabs"]

  // display users & status
  // example: https://wind-bow.glitch.me/twitch-api/users/pioslabs
  var apiUser = "freecodecamp";
  $.getJSON('https://wind-bow.glitch.me/twitch-api/users/'+apiUser+'?callback=?', function(data) {
    console.log(data);
  });


  // display stream data for eligible streamers
  // example: https://wind-bow.glitch.me/twitch-api/streams/shortyyguy

});
