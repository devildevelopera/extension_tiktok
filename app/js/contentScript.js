var downloadRandomVideo = function(){
  var cards = document.getElementsByClassName("video-card-mask");
  num = parseInt(Math.random() * cards.length);
  cards[num].click();  
  setTimeout(function () {
    video = document.getElementsByTagName("video")[1];
    download(video.src);
    var closeIcon = document.getElementsByClassName("control-icon close")[0];
    closeIcon.click();
  }, 1000);

}

var setLoginStatus = function(status){
  chrome.storage.sync.set({'loggedIn': status});
}

var checkLogin = function(){
    var aTags = document.getElementsByTagName("a");
    var loggedIn = 0;
    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].innerHTML === "Login") {
        loggedIn = 0;
        break;
      } else {
        loggedIn = 1;
      }
    }
    return loggedIn;
}


var downloadOnLogin = function(){
  status = checkLogin();
  if(status == 0){
    setTimeout(function () {
      console.log("Please login to tiktok.com first!!!");
      downloadOnLogin();
    }, 2000);
  }else{
    setLoginStatus(status);
    window.location.reload();
  }
}

window.onload = function() {
  var status = this.checkLogin()
  if (status == 1) {
    this.setLoginStatus(status);
    chrome.runtime.sendMessage({type: "get_option"});
  }else{
    downloadOnLogin();
  }
}
var interval = undefined;
chrome.runtime.onMessage.addListener(function(message, sender, response) {
  if(message.type === "set_option") {
    clearInterval(interval);
    interval = setInterval(function(){ downloadRandomVideo(); }, message.data);
  }
})


