$(document).ready(function(){
  // get Twitch data
  var users = ["adafruit", "awesomeallar", "noopkat", "freecodecamp", "lonmakes", "neorealms", "noobs2ninjas", "pioslabs"]
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
      var output = '<div class="row userData" id="'+user+'"><div class="user"><a href="%LINKUSER%" target="_blank" title="Visit %USER%&#39;s profile (opens in new window)">%USER%</a></div><div class="info"><div><div class="bio">%BIO%</div><div class="status"></div></div></div></div>';
      output = output.replace("%LINKUSER%","https://www.twitch.tv/"+user);
      output = output.replace(/%USER%/g,data.display_name);
      output = output.replace("%BIO%",data.bio);
      $("#results .container").append(output);// debug
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
      // console.log(data["_links"].self); // debug
      // display stream status
      let output = "Streaming now!";
      $("#"+user+" .status").html(output).addClass("streaming");
      // display info about what's streaming
      var streamImg = data.stream.preview.medium;
      var streamStatus = data.stream.channel.status;
      var link = data.stream.channel.url;
      output = '<a href="'+link+'" target="_blank" title="Link to stream (opens in new window)"><div class="preview"><img src="'+streamImg+'" alt="Preview of stream"><p>'+streamStatus+'</p></div></a>';
      $("#"+user+" .info").append(output);
    } // if not, indicate offline
    else {
      let output = "Offline";
      $("#"+user+" .status").html(output).addClass("offline");
    }
  });
}
