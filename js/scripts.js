$(document).ready(getWeather);
function getWeather(){
    var latitude = "";
    var longitude = "";
    
     var skycons = new Skycons({"color": "pink"});
skycons.set("icon1", Skycons.RAIN); 
    skycons.play();
    //var temperature ="";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      
    $("#putWeather").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
       
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"+&lon="+longitude+"&appid=cafcb5b05e8a25d0fd9adbd48883493a",
                function(json){
            
          // $("#test").html(JSON.stringify(json));
           $("#conditions").html(json.weather[0].main);
           var cool = json.main.temp;
           $("#temperature").html(toFahrenheit(cool));
           $("#city").html(json.name);
    });
  });
}
        $("unit").click(function () {
       var text = $('#units').text();
       $(this).html(text == "C" ? "F" : "C");
            alert("Button was clicked");
    });

    
    

}

function toFahrenheit(kelvin){
    return Math.round(kelvin*(9/5)-459.60);
}




//cafcb5b05e8a25d0fd9adbd48883493a OPENWEATHER API