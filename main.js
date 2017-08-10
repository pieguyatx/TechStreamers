$(document).ready(function(){

  // get Twitch data
  var users = ["adafruit", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "pioslabs"]

  // display users & status
  // example: https://wind-bow.glitch.me/twitch-api/users/pioslabs
  var apiUser = "freecodecamp";

  getUserData(apiUser);

  // display stream data for eligible streamers
  // example: https://wind-bow.glitch.me/twitch-api/streams/shortyyguy

});

function getUserData(user){
  // check if user actually exists
  $.getJSON('https://wind-bow.glitch.me/twitch-api/users/'+user+'?callback=?', function(data) {
    //console.log(data); // debug
    if(data.hasOwnProperty("error")){
      console.log("User " + user + " not found.")//debug
    }
    else{
      var output = '<tr class="row"><td class="user">%USER%</td><td class="bio">%BIO%</td></tr>';
      output = output.replace("%USER%",data.display_name);
      output = output.replace("%BIO%",data.bio);
      $("#results table").append(output);// debug
      console.log(output); // debug
    }
  });
}
