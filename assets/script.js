// create variable for API Key

// use this in browser http://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=51133e26b6dba1c42e2e1b1a94f55fa2
var myKey = "51133e26b6dba1c42e2e1b1a94f55fa2";

// create global variables

var citySearchEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-entry");
var weatherContainerEl = document.querySelector(".city-display");
var weatherSearchTerm = document.querySelector(".what-city");

// create main function that acts when city is searched for

var forecastSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input
    var city = cityInputEl.value.trim()
    
    // check to ensure proper city name was entered
    if (city) {
        getForecast(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city");
    }
    console.log(event);
};

// add function to get the forecast using the current weather data API 

var getForecast = function(city) {

    // create variable to understand city input
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey;

    // run function to return weather data about city
    var response = fetch(queryURL).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
        });
});
};

// create function to display the weather in the main window

var displayWeather = function(weather, searchTerm) {
    // clear old content before displaying new content
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm;

    // display actual weather
    var cityTemp = weather.main.temp
    console.log(weather);
    console.log(searchTerm);
};

// make an event listener function when someone submits a city name

citySearchEl.addEventListener("submit", forecastSubmitHandler);

getForecast();