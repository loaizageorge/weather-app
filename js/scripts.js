$(document).ready(getWeather);
getWeather();

function getWeather() {
  var latitude = "";
  var longitude = "";
  var zipcode =" ";
  
 $.getJSON("https://api.wunderground.com/api/60cbfb14f00eb290/geolookup/q/autoip.json",
        function(json) {

          var zipcode = json.location.zip;
 

     
      $.getJSON("https://api.wunderground.com/api/60cbfb14f00eb290/conditions/q/"+ zipcode+".json",
        function(json) {
          //alert(zipcode);
         var test = JSON.stringify(json);
          
          console.log(test);
          var weather =json.current_observation.weather;
          $("#condition").html(weather);
          var temp = json.current_observation.temp_f;
          temp = Math.round(temp);
          $("#temperature").html(temp);
          $("#city").html(json.current_observation.display_location.full);
          
          
          
          var skycons = new Skycons({
            "color": "pink"
          });
          if (weather == "Mostly Cloudy") {
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

