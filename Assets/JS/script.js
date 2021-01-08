var apiKey = "&appid=f6e64506bbf2ed97516451a25d139a01";
// Define global variables for API calls, user input & search history
var weatherURL = "api.openweathermap.org/data/2.5/weather?q="
var forecastURL = "api.openweathermap.org/data/2.5/forecast?q="
var searchCity = "";
// Array for search History?
var searchHistory = [];
// !! Remember document ready & prevent defaults !!
function initialise() {
    localStorage();
    searchClick();
    resetClick();
    historyClick();
    currentWeather();
    fiveDayForecast();
}
// jQuery shorthand for document ready
$(function() {
    initialise();
});

// "click" eventListener for buttons
    // Search button runs weather & forecast functions
    currentWeather();
    // Trash button deletes local storage data & resets search history
    fiveDayForecast();

// Get searchHistory from localStorage data & store into array even on pg refresh
function localStorage() {
    let savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities !== null) {
        searchHistory = savedCities
    }
    // Create buttons of searchHistory
    renderButtons();
};

// Set items into localStorage to create list of searchHistory
function searchHistory() {
    localStorage.setItem("cities", JSON.stringify(searchHistory)); 
};

// currentWeather Function
function currentWeather() {
    // API call URL: Current Weather Data
    
    // API Ajax call
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
    // Store response
};

// fiveDayForecast Function
function fiveDayForecast() {
    // API call URL: 5 Day
    
    // API Ajax call
    $.ajax({
        url: forecastURL,
        method: "GET"
    })
    // Store responses (x5 for each day)
};

    // Temperature conversion

    // Append to HTML
