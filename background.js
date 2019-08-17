// Initialization
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install") {
      chrome.storage.sync.set({"manual": true});
      chrome.storage.sync.set({"onOff": true});

      chrome.storage.sync.set({"scheduled": false});
      chrome.storage.sync.set({"startTime": "19:30"});
      chrome.storage.sync.set({"endTime": "07:00"});

      chrome.storage.sync.set({"sunsetToSunrise": false});

      console.log("completed installation");
    }
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.message === "activate_icon") {
        chrome.pageAction.show(sender.tab.id);
    }
});
