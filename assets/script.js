// create global variables

var citySearchEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-entry");

// create main function that acts when city is searched for

var forecastSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
};

// make an event listener function when someone submits a city name

citySearchEl.addEventListener("submit", forecastSubmitHandler);