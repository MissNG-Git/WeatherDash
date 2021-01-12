var apiKey = "&appid=f6e64506bbf2ed97516451a25d139a01";
var weatherURL = "api.openweathermap.org/data/2.5/weather?q="
var forecastURL = "api.openweathermap.org/data/2.5/forecast?q="
var city = "";
var queryCurrentURL = weatherURL + city + apiKey;
var queryForecastURL = forecastURL + city + apiKey;
console.log(queryCurrentURL);
console.log(queryForecastURL);
// Array for search History?
var searchHistory = [];

// !! Remember document ready & prevent defaults == shorthand? !!
// Function calls on page load
loadHistory();
searchAction();

// function initialise() {
//     loadHistory();
//     searchAction();
//     resetClick();
//     historyClick();
//     weatherAPI();
// }

// Load localStorage data on refresh & create buttons for previous search(es)
function loadHistory() {
    // Get savedCities from localStorage; set to city var (empty array) if none
    let savedCities = JSON.parse(window.localStorage.getItem("savedHistory")) || searchHistory;
    console.log(savedCities);
    if (savedCities !== null) {
        searchHistory = savedCities
    }
    renderBtns();
}

// function searchAction() {
//     $("#searchForm").submit(function(event) {
//         event.preventDeault();
//         city = $("#searchBar").val();
//         if(city.length <= 0) {
//             alert("Please enter a city name.");
//         }
//         else {
//             let savedCities = JSON.parse(window.localStorage.getItem("savedHistory")) || searchHistory;
//             searchHistory = {
//                 city: city
//             }
//             savedCities.push(searchHistory);
//             window.localStorage.setItem("savedHistory", JSON.stringify(savedCities));
//         };
//     })
// }

// // "click" eventListener for buttons
//     // Search button runs weather & forecast functions
//     currentWeather();
//     // Trash button deletes local storage data & resets search history
//     fiveDayForecast();


// currentWeather Function
function weatherAPI() {
    
    // Current Weather API Ajax call
    $.ajax({
        url: weatherURL,
        method: "GET"
    })
    
    // Forecast API Ajax call
    $.ajax({
        url: forecastURL,
        method: "GET"
    })

    // Temperature conversion

    // Append to HTML

};