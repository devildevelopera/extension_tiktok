var userLoggedIn = function(){
  chrome.storage.sync.get("loggedIn", function(data) {
    if (data.loggedIn) {
      return true;
    }else{
      return false;
    }
  });
}


var waitForLogin = function(){
  loggedIn = userLoggedIn()  
  if (loggedIn) {
    $('#logInMessage').hide();
    $('#forLoggedUser').show();
  }else{
    setTimeout(function () {
      waitForLogin();
      console.log(`login status: ${status}`)
    }, 1000);    
  }
}

window.onload = function() {
  $('.loader').hide();
  $('#forLoggedUser').show();
};


let searchBtn = document.getElementById('searchBtn');


const submitBtn = document.getElementById('searchBtn');
const hashTag = document.getElementById('hashtag');

submitBtn.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    status = userLoggedIn()
    // status = true;
    if (status) {
      if(hashTag.value != ""){     
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: `document.location.href = "https://www.tiktok.com/tag/${hashTag.value}";`}
      );     
      chrome.storage.sync.set({hashtag: hashTag.value}, function() {
        console.log('Hastag is set to ' + hashTag.value);
      })
      }        
    }else{
      $('#logInMessage').show();
    }
  });
};
