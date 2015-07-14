document.addEventListener("DOMContentLoaded", function() {


  navigator.geolocation.getCurrentPosition(geoSuccess);
  //getHeadlines("/news");

  var startPos;
  function geoSuccess(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;
    getWeather("/weather/" + lat + "/" + long);
  };

  function getWeather(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', function(e) {
      var data = xhr.responseText;
      var parsed = JSON.parse(data);
      document.getElementById("spinner").style.display="none";
      var forecast = document.getElementById("forecast");

      var twelveHour = parsed.hourly.data.splice(0, 12);
      twelveHour.forEach(function(hour){
        var li = document.createElement("li");
        li.setAttribute("class", "col s12 z-depth-1 day");
        tempClass(hour.apparentTemperature, li);
        precipitation(hour.precipIntensity, li);
        forecast.appendChild(li);
        console.log(timeConversion(hour.time));
        console.log(hour.summary);
        document.getElementById("weatherSummary").innerHTML = hour.summary;
      });


    });
    xhr.send();
  };


  //clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night

  function timeConversion(timestamp) {
          // create a new javascript Date object based on the timestamp
          // multiplied by 1000 so that the argument is in milliseconds, not seconds
          var date = new Date(timestamp*1000);
          // hours part from the timestamp
          var hours = date.getHours();
          // minutes part from the timestamp
          var minutes = "0" + date.getMinutes();
          // seconds part from the timestamp
          var seconds = "0" + date.getSeconds();
          // will display time in 10:30:23 format
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

          return formattedTime;
        }

  function tempClass(data, elem) {
    var temp = Math.round(data);
    if (temp <= 10) {
      elem.classList.add("lighten-5");
      console.log(temp);
    } else if (temp <= 20) {
      elem.classList.add("lighten-4");
      console.log(temp);
    } else if (temp <= 30) {
      elem.classList.add("lighten-3");
      console.log(temp);
    } else if (temp <= 40) {
      elem.classList.add("lighten-2");
      console.log(temp);
    } else if (temp <= 50) {
      elem.classList.add("lighten-1");
      console.log(temp);
    } else if (temp <= 60) {
      elem.classList.add("darken-1");
      console.log(temp);
    } else if (temp <= 70) {
      elem.classList.add("darken-2");
      console.log(temp);
    } else if (temp <= 80) {
      elem.classList.add("darken-3");
      console.log(temp);
    } else if (temp <= 90) {
      elem.classList.add("darken-4");
      console.log(temp);
    } else {
      console.log(temp);
    }
  };

  function weatherClasses(tempData, precipInt, precipProb, elem) {
    var temp = Math.round(tempData);

    if (temp <= 10) {
      elem.classList.add("lighten-5");
      console.log(temp);
    } else if (temp <= 20) {
      elem.classList.add("lighten-4");
      console.log(temp);
    } else if (temp <= 30) {
      elem.classList.add("lighten-3");
      console.log(temp);
    } else if (temp <= 40) {
      elem.classList.add("lighten-2");
      console.log(temp);
    } else if (temp <= 50) {
      elem.classList.add("lighten-1");
      console.log(temp);
    } else if (temp <= 60) {
      elem.classList.add("darken-1");
      console.log(temp);
    } else if (temp <= 70) {
      elem.classList.add("darken-2");
      console.log(temp);
    } else if (temp <= 80) {
      elem.classList.add("darken-3");
      console.log(temp);
    } else if (temp <= 90) {
      elem.classList.add("darken-4");
      console.log(temp);
    } else {
      console.log(temp);
    }

    if (precipProb <= 0.1) {
      elem.classList.add("pink");
      console.log(precipProb);
    } else if (precipProb <= 0.2) {
      elem.classList.add("red");
      console.log(precipProb);
    } else if (precipProb <= 0.3) {
      elem.classList.add("amber");
      console.log(precipProb);
    } else if (precipProb <= 0.4) {
      elem.classList.add("orange");
      console.log(precipProb);
    } else if (precipProb <= 0.5) {

      if (precipInt >= 0.02) {
        elem.classList.add("orange");
      }
      else if (precipInt <= 0.1) {
        console.log("light precip: " + precipInt);
        precipIntensity = light
      } else if (precipInt <= 0.4) {
        console.log("mod precip: " + precipInt);
        precipIntensity = light
      } else {
        console.log("heavy precip: " + precipInt);
        precipIntensity = light
      }

      elem.classList.add("light-blue");
      console.log(precipProb);
    } else if (precipProb <= 0.6) {
      elem.classList.add("blue");
      console.log(precipProb);
    } else if (precipProb <= 0.7) {
      elem.classList.add("");
      console.log(precipProb);
    } else if (precipProb <= 0.8) {
      elem.classList.add("darken-3");
      console.log(precipProb);
    } else if (precipProb <= 0.9) {
      elem.classList.add("darken-4");
      console.log(precipProb);
    } else {
      console.log(precipProb);
    }




    var precipIntensity;
    if (precipInt >= 0.02) {
      console.log("little to no: " + precipInt);
      precipIntensity = none;
    }
    else if (precipInt <= 0.1) {
      console.log("light precip: " + precipInt);
      precipIntensity = light
    } else if (precipInt <= 0.4) {
      console.log("mod precip: " + precipInt);
      precipIntensity = light
    } else {
      console.log("heavy precip: " + precipInt);
      precipIntensity = light
    }





  };


  // function tempGradient(minTemp, maxTemp, elem) {
  //   var min = Math.round(minTemp);
  //   var max = Math.round(maxTemp);

  //   elem.style.background = "@include gradient($default, red, blue)";

  // }

  function precipitation(data, elem) {
    if (data <= 0.02) {
      console.log("little to no precip: " + data);
      elem.classList.add("amber");
    } else if(data <= 0.1) {
      console.log("light precip: " + data);
      elem.classList.add("cyan");
    } else if (data <= 0.4) {
      console.log("mod precip: " + data);
      elem.classList.add("blue");
    } else {
      console.log("heavy precip: " + data);
      elem.classList.add("indigo");
    }
  }






}); //end DOMContentLoaded
