var apiKey = "&APPID=f2f158402823bdbe24bfcc3629d2226d";
var url = "http://api.openweathermap.org/data/2.5/weather?q=";
var units;

var request = new XMLHttpRequest();

$(document).ready(function() {
  var temp = $("#temp");
  var humid = $("#humid");

  //Look for Enter key press
  $("#city").keypress(function(event) {

    var city = $("#city").val();

    //13 is the keycode for Enter
    if (event.which == 13) {

      var cityData;

      //Checks for units selected by user between the two radio buttons
      var unitType = $("input[name='units']:checked").val();
      if (unitType === "f") {
        units = "&units=imperial";
        findWeather(units);
      } else {
        units = "&units=metric";
        findWeather(units);
      }

      //JSON API call function
      function findWeather(data) {
        $.getJSON(url + city + apiKey + units, function(json) {

          //Assign JSON data to cityCata variable
          cityData = json;

          //Add temperature to the Temperature div element
          temp.html("Temperature: " + cityData.main.temp + " &deg;" + unitType.toUpperCase());

          //Add humidity to the Humidity div element
          humid.html("Humidity: " + cityData.main.humidity + " %");

          //Fetch and add icon to the icon div element
          $("#icon").html("<img src='http://openweathermap.org/img/w/" + cityData.weather[0].icon + ".png' alt='Weather icon.'>");
          console.log(cityData.weather.icon);
        });
      }

    }
  });

});
