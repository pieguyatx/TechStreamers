$(document).ready(function(){
  // get Twitch data
  var users = ["adafruit", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "noobs2ninjas", "pioslabs", "CapcomFighters"]
  // display users & status
  // example: https://wind-bow.glitch.me/twitch-api/users/pioslabs
  for(let i=0; i<users.length; i++){
    var apiUser = users[i];
    getUserData(apiUser);
  }
});

function getUserData(user){
  // check if user actually exists
  $.getJSON('https://wind-bow.glitch.me/twitch-api/users/'+user+'?callback=?', function(data) {
    //console.log(data); // debug
    if(data.hasOwnProperty("error")||!data.bio){
      console.log("User " + user + " not found.")//debug
    }
    else{ // if user exists, display info
      var output = '<div class="row userData" id="'+user+'"><div class="user">%USER%</div><div class="info"><div class="bio">%BIO%</div><div class="status"></div></div></div>';
      output = output.replace("%USER%",data.display_name);
      output = output.replace("%BIO%",data.bio);
      $("#results .container").append(output);// debug
      // console.log(output); // debug
      // get streaming info on existing user
      getStreamData(user);
    }
  });
}

function getStreamData(user){
  // get stream data
  $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+user+'?callback=?', function(data){
    // if stream detected, display data
    if(data.stream){
      console.log(data["_links"].self); // debug
      let output = "Streaming now!";
      $("#"+user+" .status").html(output).addClass("streaming");
    } // if not, indicate offline
    else {
      let output = "Offline";
      $("#"+user+" .status").html(output).addClass("offline");
    }
  });

  // display stream data for eligible streamers

}
