document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(null, function(result) {
    // document.body.classList.add("preload");

    document.getElementById("manual").checked = result.manual;
    document.getElementById("onOff").checked = result.onOff;

    document.getElementById("scheduled").checked = result.scheduled;
    document.getElementById("startTime").value = result.startTime;
    document.getElementById("endTime").value = result.endTime;

    document.getElementById("sunsetToSunrise").checked = result.sunsetToSunrise;

    setTimeout(function(){ document.body.classList.remove("preload"); }, 100);

  });

  document.getElementById("manual").addEventListener("change", function() {
    chrome.storage.sync.set({"manual": document.getElementById("manual").checked});
    chrome.storage.sync.set({"scheduled": document.getElementById("scheduled").checked});
    chrome.storage.sync.set({"sunsetToSunrise": document.getElementById("sunsetToSunrise").checked});
  });

  document.getElementById("onOff").addEventListener("change", function() {
    chrome.storage.sync.set({"onOff": document.getElementById("onOff").checked});
  });


  document.getElementById("scheduled").addEventListener("change", function() {
    chrome.storage.sync.set({"manual": document.getElementById("manual").checked});
    chrome.storage.sync.set({"scheduled": document.getElementById("scheduled").checked});
    chrome.storage.sync.set({"sunsetToSunrise": document.getElementById("sunsetToSunrise").checked});
  });

  document.getElementById("startTime").addEventListener("change", function() {
    chrome.storage.sync.set({"startTime": document.getElementById("startTime").value});
  });

  document.getElementById("endTime").addEventListener("change", function() {
    chrome.storage.sync.set({"endTime": document.getElementById("endTime").value});
  });


  document.getElementById("sunsetToSunrise").addEventListener("change", function() {
    chrome.storage.sync.set({"manual": document.getElementById("manual").checked});
    chrome.storage.sync.set({"scheduled": document.getElementById("scheduled").checked});
    chrome.storage.sync.set({"sunsetToSunrise": document.getElementById("sunsetToSunrise").checked});
  });

});
