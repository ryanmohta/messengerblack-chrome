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
      chrome.storage.sync.set({"latitude": 0});
      chrome.storage.sync.set({"longitude": 0});
    }
});

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
      // Getting and Sending Location
      navigator.geolocation.getCurrentPosition(function(position) {
        chrome.storage.sync.set({"latitude": position.coords.latitude});
        chrome.storage.sync.set({"longitude": position.coords.longitude});

        sendResponse({name: "sunsetToSunrise", latitude: position.coords.latitude, longitude: position.coords.longitude});
      });
      clearInterval(timerVariable);
      timerVariable = setInterval(getLocation, 86400);
    }
    return true;
  });

function getLocation() {
  // Getting and Sending Location
  navigator.geolocation.getCurrentPosition(function(position) {
    chrome.storage.sync.set({"latitude": position.coords.latitude});
    chrome.storage.sync.set({"longitude": position.coords.longitude});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {name: "sunsetToSunrise", latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  });
}
