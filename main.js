//MyWidget Script
/**************************
Add a link for a CSS file that styles .mywidget
Add a script tag that points to CDN version of jQuery 1.*
Add a script tag that loads your script file from http://m.edumedia.ca/
**************************/
var scriptsLoaded = 0;
var counter = 0;

document.addEventListener("DOMContentLoaded", init);
  
function init(){

  var css = document.createElement("link");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "css/weather-icons.min.css"); 
  //loads the CSS file and applies it to the page
  css.addEventListener("load", loadCount);
  document.querySelector("head").appendChild(css);

  var jq = document.createElement("script");
  jq.addEventListener("load", loadCount);
  jq.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
  document.querySelector("head").appendChild(jq);
}

function buildWidget(cls){
  //now do the ajax call then build your page
  console.log("using div with class %s", cls);
  $.get(
    "https://api.forecast.io/forecast/fc5ba130aa2ed35b17b1d5653808d40c/45.3470,-75.7594?units=ca&exclude=daily,minutely,flags,alerts",
    mustardTiger,
    "jsonp"
  );

  function mustardTiger(data) {
  console.log("put data into div with class" + cls)
  console.log(data);

  var currentTime = new Date(data.currently.time * 1000)
  var thisDay = currentTime.getDay()+1 
  var thisMonth = currentTime.getMonth()+1
  var today = thisDay + "/" + thisMonth
  var todayIcon = data.currently.icon
  var todayTemp = data.currently.temperature
  var todaySum = data.currently.summary
  var currentHour = currentTime.getHours()
  var currentHumid = Math.floor(data.hourly.data[0].humidity * 100) + "%"
  var currentCloud = Math.floor(data.hourly.data[0].cloudCover * 100) + "%"
  var currentTemp = Math.floor(data.hourly.data[0].temperature) + "°C"
  var currentWind = Math.floor(data.hourly.data[0].windSpeed) + "km/h"
  var currentIcon = data.currently.icon
  var currentSum = data.hourly.data[0].summary

  $("<p>").text("Current Conditions for today, " + today).appendTo(".weather-forecast");
  $("<i>").addClass("wi wi-forecast-io-" + currentIcon + " current").appendTo(".weather-forecast");
  $("<p>").text("Temperature " + todayTemp + "°C").appendTo(".weather-forecast");
  $("<p>").text(todaySum).appendTo(".weather-forecast");
  $("<table>").appendTo(".weather-forecast");
  $("<tbody>").appendTo("table");
  $("<tr>").appendTo("tbody");
  $("<td>").text(currentHour + ":00").appendTo("tr");
  $("<td>").text(currentHumid).appendTo("tr");
  $("<td>").text(currentCloud).appendTo("tr");
  $("<td>").text(currentTemp).appendTo("tr");
  $("<td>").text(currentWind).appendTo("tr");
  $("<i>").addClass("wi wi-forecast-io-" + currentIcon).appendTo("tr");
  $("<td>").text(currentSum).appendTo("tr");

  for (i=1; i<23; i++) {
  counter = counter +1

  $("<tr>").addClass("row" + counter).appendTo("tbody");
  $("<td>").text(currentHour + counter + ":00").appendTo(".row" + counter);
  $("<td>").text(Math.floor(data.hourly.data[i].humidity * 100) + "%").appendTo(".row" + counter);
  $("<td>").text(Math.floor(data.hourly.data[i].cloudCover * 100) + "%").appendTo(".row" + counter);
  $("<td>").text(Math.floor(data.hourly.data[i].temperature) + "°C").appendTo(".row" + counter);
  $("<td>").text(Math.floor(data.hourly.data[i].windSpeed) + "km/h").appendTo(".row" + counter);
  $("<i>").addClass("wi wi-forecast-io-" + data.hourly.data[i].icon).appendTo(".row" + counter);
  $("<td>").text(data.hourly.data[i].summary).appendTo(".row" + counter);
    
    if (counter === 22 || currentHour + counter === 23) {
        break;
      }
      
    if (i === 22 || currentHour + counter === 23) {
        break;
      }  
    }
  }
}

function loadCount(){
    scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
    buildWidget(".weather-forecast");
    //console.log("both scripts loaded");
  }
}
