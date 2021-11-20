// create variable for API Key

// use this in browser http://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=51133e26b6dba1c42e2e1b1a94f55fa2&units=imperial
var myKey = "51133e26b6dba1c42e2e1b1a94f55fa2";

// create global variables 

var citySearchEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-entry");
var weatherContainerEl = document.querySelector(".city-display");
var weatherSearchTerm = document.querySelector(".what-city");
var forecastContainerEl = document.querySelector(".forecast");
var cityHistoryContainer = document.querySelector("#city-history");

// create function to push button push into cityInputEl

// var savedCityHandler = function(event) {
// }

// create main function that acts when city is searched for

var forecastSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input
    var city = cityInputEl.value.trim()
    
    // check to ensure proper city name was entered
    if (city) {
        getForecast(city);
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
                mainUvEl.textContent = ("UV Index: ");
                sideUvEl = document.createElement("span");
                sideUvEl.textContent = (data2.current.uvi);
                sideUvEl.setAttribute("class", "bg-success text-white");
                weatherContainerEl.appendChild(mainUvEl);
                mainUvEl.appendChild(sideUvEl);
            })
        });        

};

// create loop to display forecast data

var weatherLoop = function(data2) {

    // clear forecast container before displaying anything
    forecastContainerEl.textContent = "";

    for (let day = 0; day < 5; day++) {

            console.log(data2)

    // set up variable for icon display
    var forecastIcon = "http://openweathermap.org/img/wn/" + data2.daily[day].weather[0].icon + ".png";
  

    // create individual card for each day

    var fiveDayContainer = document.createElement("div");
    fiveDayContainer.setAttribute("id", day)
    fiveDayContainer.setAttribute("class", "col-2 bg-secondary m-3 text-white mw-50")
    forecastContainerEl.appendChild(fiveDayContainer)

    // display date
    var futureDate = moment().add(day+1, 'days').format('L');
    var showFutureDateEl = document.createElement("h3");
    showFutureDateEl.textContent = futureDate;
    fiveDayContainer.appendChild(showFutureDateEl);

    // display icon
    var forecastIconHolder = document.querySelector("#forecast-icon-span");
    var forecastIconImg = document.createElement("img");
    forecastIconImg.setAttribute("src", forecastIcon);
    fiveDayContainer.appendChild(forecastIconImg);
    

    // display temp
    var futureTemp = document.createElement("p");
    futureTemp.textContent = ("Temp: " + Math.round(data2.daily[day].temp.day) + " " + '\xB0' + "F");
    fiveDayContainer.appendChild(futureTemp);

    // display wind speed
    var futureWind = document.createElement("p");
    futureWind.textContent = ("Wind speed: " + data2.daily[day].wind_speed + "mph");
    fiveDayContainer.appendChild(futureWind);

    // display humidity
    var futureHumidity = document.createElement("p");
    futureHumidity.textContent = ("Humidity: " + data2.daily[day].humidity + "%");
    fiveDayContainer.appendChild(futureHumidity);

    };
};

// Log data into saved city list

var savedCityList = function(cityName) {

    // either load information from an array or create a blank array
    var savedCities = JSON.parse(localStorage.getItem("city-history")) || [];

    // save the city search into the saved city list
    savedCities.unshift(cityName);
    localStorage.setItem("city-history", JSON.stringify(savedCities));
};

var renderCityList = function() {

    // make sure city list is cleared before storing anything
    cityHistoryContainer.textContent = "";

    var savedCities = JSON.parse(localStorage.getItem("city-history")) || [];

    // return only the first 5 elements of the array
    // var fiveCities = savedCities.slice(0, 5);
    
    for (let i = 0; i < savedCities.length; i++) {
        var insertCity = document.createElement("button");
        insertCity.textContent = savedCities[i];
        insertCity.setAttribute("id", "city" + i);
        insertCity.setAttribute("class", "mt-3")
        insertCity.type = "button";
        cityHistoryContainer.append(insertCity);
        insertCity.onclick = cityClick;

        if (i > 5) {
            break;
        }
                
    };
};

var cityClick = function() {
    getForecast(this.textContent);
};


// call render city function so that old city buttons display on refresh
renderCityList();

// make an event listener function when someone submits a city name

citySearchEl.addEventListener("submit", forecastSubmitHandler);

// make an event listener for when someone clicks on a saved city