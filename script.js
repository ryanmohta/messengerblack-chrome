var SunCalc = require('suncalc');

var timerVariable;

chrome.runtime.sendMessage({"message": "activate_icon"});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.name == "manual") {
      manualChanged(request);
    }
    else if (request.name == "scheduled") {
      scheduledChanged(request);
    }
    else if (request.name == "sunsetToSunrise") {
      sunsetToSunriseChanged(request);
    }
  });


function manualChanged(request) {
  if (request.onOff == true) {
    document.body.classList.add("blackMode");
  }
  else {
    document.body.classList.remove("blackMode");
  }

  clearInterval(timerVariable);
}

function scheduledChanged(request) {
  var startTimeDate = new Date("January 1, 2019 " + request.startTime);
  var endTimeDate = new Date("January 2, 2019 " + request.endTime);

  var startTimeHour = startTimeDate.getHours();
  var startTimeMinute = startTimeDate.getMinutes();

  var endTimeHour = endTimeDate.getHours();
  var endTimeMinute = endTimeDate.getMinutes();

  scheduledTimer(startTimeHour, startTimeMinute, endTimeHour, endTimeMinute);

  clearInterval(timerVariable);
  timerVariable = setInterval(scheduledTimer, 1000, startTimeHour, startTimeMinute, endTimeHour, endTimeMinute);
}

function sunsetToSunriseChanged(request) {
    var times = SunCalc.getTimes(new Date(), request.latitude, request.longitude);

    var sunsetHour = times.sunset.getHours();
    var sunsetMinute = times.sunset.getMinutes();

    var sunriseHour = times.sunrise.getHours();
    var sunriseMinute = times.sunrise.getMinutes();

    scheduledTimer(sunsetHour, sunsetMinute, sunriseHour, sunriseMinute);

    clearInterval(timerVariable);
    timerVariable = setInterval(scheduledTimer, 1000, sunsetHour, sunsetMinute, sunriseHour, sunriseMinute);
}



function scheduledTimer(startTimeHour, startTimeMinute, endTimeHour, endTimeMinute) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();

    if(currentHour < endTimeHour || (currentHour <= endTimeHour && currentMinute < endTimeMinute) || (currentHour >= startTimeHour && currentMinute >= startTimeMinute) || currentHour > startTimeHour) {
        document.body.classList.add("blackMode");
    }
    else {
        document.body.classList.remove("blackMode");
    }
}
