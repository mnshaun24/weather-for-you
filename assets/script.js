// create variable for API Key

// use this in browser https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=51133e26b6dba1c42e2e1b1a94f55fa2&units=imperial
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
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey +"&units=imperial";

    // run function to return weather data about city
    var response = fetch(queryURL).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
        });
});
};

// create function to display the weather in the main window

var displayWeather = function(weather, searchTerm) {

    // clear old content and display new content
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm

    // display the date along with the city
    var dateNow = moment().format('L');
    var showDate = document.querySelector("#show-date");
    showDate.textContent = dateNow;

    // display the local weather
    var mainWeatherEl = document.createElement("p");
    mainWeatherEl.textContent = (weather.weather[0].main);
    weatherContainerEl.appendChild(mainWeatherEl);

    // display temperature
    var mainTempEl = document.createElement("p");
    mainTempEl.textContent = ("Temp: " + Math.round(weather.main.temp) + " " + '\xB0' + "F");
    weatherContainerEl.appendChild(mainTempEl);

    // display wind speed
    var mainWindEl = document.createElement("p");
    mainWindEl.textContent = ("Wind: " + weather.wind.speed + " mph");
    weatherContainerEl.appendChild(mainWindEl);

    // display humidity
    var mainHumidityEl = document.createElement("p");
    mainHumidityEl.textContent = ("Humidity: " + weather.main.humidity + '\u0025')
    weatherContainerEl.appendChild(mainHumidityEl);

    var APIUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + weather.coord.lat + "&lon=" + weather.coord.lon + "&appid=51133e26b6dba1c42e2e1b1a94f55fa2";
    mainUvEl = document.createElement("p");
    mainUvEl.textContent = (onecall.current.uvi);
    weatherContainerEl.appendChild(mainUvEl);
};

// make an event listener function when someone submits a city name

citySearchEl.addEventListener("submit", forecastSubmitHandler);