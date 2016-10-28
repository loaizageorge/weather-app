$(document).ready(getWeather);

function getWeather() {
  var latitude = "";
  var longitude = "";
  var zipcode =" ";
  
 $.getJSON("https://api.wunderground.com/api/60cbfb14f00eb290/geolookup/q/autoip.json",
        function(json) {

    var zipcode = json.location.zip;
    $("#city").append(json.location.city);
 

     
      $.getJSON("https://api.wunderground.com/api/60cbfb14f00eb290/forecast/q/"+ zipcode+".json",
        function(json) {
          //alert(zipcode);
         var test = JSON.stringify(json);
          var html = "<div class='row'>";
            for(var i=0;i<4;i++){
                var weekday = json.forecast.simpleforecast.forecastday[i].date.weekday; 
                var temperature = json.forecast.simpleforecast.forecastday[i].high.fahrenheit;
                var weather = json.forecast.simpleforecast.forecastday[i].conditions;
                var icon = "icon"+i;
                html = "<div class='col-sm-3'><div class='content-block'><canvas id="+icon+" width='128' height='128'></canvas><h2>"+weekday+"</h2><h2 id='temperature'>"+temperature+"</h2><h2 id='degree'>&deg</h2><h2>"+weather+"</h2></div></div>";
                $(".content").append(html);
                
                 var skycons = new Skycons({
            "color": "pink"
          });
          if (weather == "Mostly Cloudy"||weather == "Partly Cloudy"||weather == "Scattered Clouds") {
            skycons.set(icon, Skycons.CLOUDY);
          } else if (weather == "Rain" || weather == "Drizzle" || weather == "Thunderstorm" | weather == "Chance of a Thunderstorm") {
            skycons.set(icon, Skycons.RAIN);
          } else if (weather == "Snow") {
            skycons.set(icon, Skycons.SNOW);
          } else if (weather == "Clear") {
            skycons.set(icon, Skycons.CLEAR_DAY);
          } else {
            skycons.set(icon, Skycons.CLEAR_DAY);
          }
          //skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT); 
          skycons.play();
                
            }
          //html += "</div>";
          $(".content").append("</div>");
         
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

