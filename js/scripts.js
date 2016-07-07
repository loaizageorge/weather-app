$(document).ready(getWeather);
getWeather();

function getWeather() {
  var latitude = "";
  var longitude = "";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      $("#putWeather").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);

      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=cafcb5b05e8a25d0fd9adbd48883493a",
        function(json) {

          
          var weather = json.weather[0].main;
          $("#condition").html(json.weather[0].main);
          var cool = json.main.temp;
          $("#temperature").html(toFahrenheit(cool));
          $("#city").html(json.name);

          var skycons = new Skycons({
            "color": "pink"
          });
          if (weather == "Clouds") {
            skycons.set("icon1", Skycons.CLOUDY);
          } else if (weather == "Rain" || weather == "Drizzle" || weather == "Thunderstorm") {
            skycons.set("icon1", Skycons.RAIN);
          } else if (weather == "Snow") {
            skycons.set("icon1", Skycons.SNOW);
          } else if (weather == "Clear") {
            skycons.set("icon1", Skycons.CLEAR_DAY);
          } else {
            skycons.set("icon1", Skycons.FOG);
          }
          //skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT); 
          skycons.play();
        });
    });
  }

}

function toFahrenheit(kelvin) {
  return Math.round(kelvin * (9 / 5) - 459.60);
}

function change() {
  var text = $('#changeMe').text();
  var temp = $('#temperature').text();
  if (text == 'F') {
    $('#changeMe').text('C');
    var celsius = Math.round(((temp - 32) * (5 / 9)))
    $('#temperature').text(celsius);
  } else {
    $('#changeMe').text('F');
    var fahrenheit = Math.round(temp * (9 / 5) + 32);
    $('#temperature').text(fahrenheit);

  }

}