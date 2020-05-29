'use strict';
var currentTab = undefined;
// var option = 15000;
var option = 14400000;
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.tiktok.com', schemes: ['https'] },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          css: ["video"]
        })        
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
    
  });

  chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.type === "options") {
      chrome.tabs.sendMessage(currentTab, {type: "set_option", data: message.data});
    }
    if(message.type === "get_option") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        currentTab = tabs[0].id;
        chrome.tabs.sendMessage(currentTab, {type: "set_option", data: option});
      });
    }
  });  
});



