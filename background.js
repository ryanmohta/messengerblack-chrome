var timerVariable;

// Initialization
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install") {
      chrome.storage.sync.set({"manual": true});
      chrome.storage.sync.set({"onOff": true});

      chrome.storage.sync.set({"scheduled": false});
      chrome.storage.sync.set({"startTime": "19:30"});
      chrome.storage.sync.set({"endTime": "07:00"});

      chrome.storage.sync.set({"sunsetToSunrise": false});
    }
});

// Check if extension is run on facebook.com
chrome.webNavigation.onDOMContentLoaded.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get(['state'], function(result) {
      chrome.tabs.insertCSS(tabs[0].id, {
        file: "node_modules/@messengerblack/messengerblack-css/base.css"
      });
    });
  });
}, {url: [{hostContains: '.facebook'}]});

// Check if extension is run on messenger.com
chrome.webNavigation.onDOMContentLoaded.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.storage.sync.get(['state'], function(result) {
      chrome.tabs.insertCSS(tabs[0].id, {
        file: "node_modules/@messengerblack/messengerblack-css/base.css"
      });
      chrome.tabs.insertCSS(tabs[0].id, {
        file: "node_modules/@messengerblack/messengerblack-css/svg.css"
      });
    });
  });
}, {url: [{hostContains: '.messenger'}]});


chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.message === "activate_icon") {
        chrome.pageAction.show(sender.tab.id);
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "manualBackground") {
      clearInterval(timerVariable);
    }
    else if (request.name == "scheduledBackground") {
      clearInterval(timerVariable);
    }
    else if (request.name == "sunsetToSunriseBackground") {
      getLocation();
      clearInterval(timerVariable);
      timerVariable = setInterval(getLocation, 86400);
    }
    return true;
  });

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {name: "sunsetToSunrise", latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  });
}
