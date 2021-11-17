// create variable for API Key

// use this in browser http://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=51133e26b6dba1c42e2e1b1a94f55fa2&units=imperial
var myKey = "51133e26b6dba1c42e2e1b1a94f55fa2";

// create global variables 

var citySearchEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-entry");
var weatherContainerEl = document.querySelector(".city-display");
var weatherSearchTerm = document.querySelector(".what-city");
var forecastContainerEl = document.querySelector(".forecast");

// create main function that acts when city is searched for

var forecastSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input
    var city = cityInputEl.value.trim()
    
    // check to ensure proper city name was entered
    if (city) {
        getForecast(city);
        weatherLoop(city);
        savedCityList(city);
        renderCityList();
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
    fetch(queryURL)
        .then(function(response) {
        response.json()
            .then(function(data) {
            displayWeather(data, city);
        });
});
};

// create function to display the weather in the main window

var displayWeather = function(weather, searchTerm) {

    // clear old content and display new content
    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm

    // create variable to display icon
    var weatherIcon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png";
    
    

    // display the date along with the city
    var dateNow = moment().format('L');
    var showDate = document.querySelector("#show-date");
    showDate.textContent = dateNow;

    // display the local weather
    var weatherIconEl = document.querySelector("#weather-icon");
    weatherContainerEl.innerHTML = `<img src=${weatherIcon}>`;

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

    // use first API call to gather needed information from second API call
    var APIUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" + weather.coord.lat + "&lon=" + weather.coord.lon + "&appid=" + myKey + "&units=imperial";

    console.log(APIUrl)
    // fetch second API call and return object then append information from object
        fetch(APIUrl)
        .then(function (response2) {
            response2.json()
            .then(function(data2) {
                weatherLoop(data2)
                mainUvEl = document.createElement("p");
                mainUvEl.textContent = ("UV Index: " + data2.current.uvi);
                weatherContainerEl.appendChild(mainUvEl);
            })
        });        

};

// create loop to display forecast data

var weatherLoop = function(data2) {

    for (let day = 0; day < 5; day++) {

    // set up variable for icon display
    var forecastIcon = "http://openweathermap.org/img/wn/" + data2.daily[day].weather[0].icon + ".png";

    // create individual card for each day

    var forecastIconEl = document.querySelector("#forecast-icon");
    forecastIconEl.innerHTML = `<img src=${forecastIcon}>`;

    var futureDate = moment().add(day+1, 'days').format('L');
    var showFutureDateEl = document.createElement("h3");
    showFutureDateEl.textContent = futureDate;
    forecastContainerEl.appendChild(showFutureDateEl);

    var futureTemp = document.createElement("p");
    futureTemp.textContent = ("Temp: " + Math.round(data2.current.temp) + " " + '\xB0' + "F");
    forecastContainerEl.appendChild(futureTemp);

    var futureWind = document.createElement("p");
    futureWind.textContent = ("Wind speed: " + data2.current.wind_speed + "mph");
    forecastContainerEl.appendChild(futureWind);

    var futureHumidity = document.createElement("p");
    futureHumidity.textContent = ("Humidity: " + data2.current.humidity + "%");
    forecastContainerEl.appendChild(futureHumidity);

    };
};

// Log data into saved city list

var savedCityList = function(cityName) {

    // either load information from an array or create a blank array
    var savedCities = JSON.parse(localStorage.getItem("city-list")) || [];

    // save the city search into the saved city list
    savedCities.push(cityName);
    localStorage.setItem("city-list", JSON.stringify(savedCities));
};

var renderCityList = function() {

    // make sure city list is cleared before storing anything
    weatherContainerEl.textContent = "";

    var savedCities = JSON.parse(localStorage.getItem("city-list")) || [];
    
    for (let i = 0; i < savedCities.length; i++) {
        var insertCity = document.createElement("button");
        insertCity.textContent = savedCities[i];
        weatherContainerEl.appendChild(insertCity);
    
        
    }
};

// call render city function so that old city buttons display on refresh
renderCityList();

// make an event listener function when someone submits a city name

citySearchEl.addEventListener("submit", forecastSubmitHandler);