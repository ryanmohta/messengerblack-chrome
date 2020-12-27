import axios from 'axios';
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

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "activate_icon") {
      chrome.pageAction.show(sender.tab.id);

      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        // Check if extension is run on facebook.com
        if (url.includes('facebook.com')) {
          chrome.tabs.insertCSS(tabs[0].id, {
            file: "node_modules/@messengerblack/messengerblack-css/base.css"
          });
        } // Check if extension is run on messenger.com
        else if (url.includes('messenger.com')) {
          chrome.tabs.insertCSS(tabs[0].id, {
            file: "node_modules/@messengerblack/messengerblack-css/base.css"
          });
          chrome.tabs.insertCSS(tabs[0].id, {
            file: "node_modules/@messengerblack/messengerblack-css/svg.css"
          });
        }
      });
    }
  }
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "manualBackground") {
      clearInterval(timerVariable);
    }
    else if (request.name == "scheduledBackground") {
      clearInterval(timerVariable);
    }
    else if (request.name == "sunsetToSunriseBackground") {
      console.log(process.env.IPSTACK_APIKEY);
      const url=`http://api.ipstack.com/check?access_key=${process.env.IPSTACK_APIKEY}`;
      console.log(url);
      axios.get(url)
      .then(data=>console.log(data))
      .catch(err=>console.log(err));


      // axios.all([getLatitude(), getLongitude()])
      // .then((latitude, longitude) => {
      //   console.log(latitude);
      //   console.log(longitude);
      // })
      // .catch(err => console.log(err));


      // navigator.geolocation.getCurrentPosition(
      //   function(position) {
      //     console.log(`Latitude: ${position.coords.latitude}`);
      //     console.log(`Longitude: ${position.coords.longitude}`);
      //
      //     chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
      //       chrome.tabs.sendMessage(tabs[0].id, {name: "sunsetToSunrise", latitude: position.coords.latitude, longitude: position.coords.longitude});
      //     });
      //   }
      // );
      //
      // clearInterval(timerVariable);
      // timerVariable = setInterval(getLocation, 86400);
    }
  }
);

// function getLatitude() {
//   const url='https://ipapi.co/latitude';
//   return axios.get(url);
// }
//
// function getLongitude() {
//   const url='https://ipapi.co/longitude';
//   return axios.get(url);
// }
