// create variable for API Key

var myKey = "51133e26b6dba1c42e2e1b1a94f55fa2";

// create global variables

var city;
var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + "Minneapolis" + "&appid=" + myKey;
var citySearchEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-entry");

// create main function that acts when city is searched for

var forecastSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
};

// add function to get the forecast

var getForecast = function() {
    var response = fetch(queryURL);
    console.log(response);
};

// make an event listener function when someone submits a city name

citySearchEl.addEventListener("submit", forecastSubmitHandler);