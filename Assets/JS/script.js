// Define global variables
var searchBar = $("#searchBar");
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var apiKey = "471ac66dcee7336c8919fa741ccc6ad6";
var weatherURL;
var forecastURL;
var savedSearch = [];

// Load localStorage data on refresh 
var loadStorage = localStorage.getItem("savedSearch");
if (loadStorage != null) {
    savedSearch = loadStorage.split(",");
}
// Variable for todays's date
var today = new Date();
var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// Change format of date to Mo / Day / Yr
function formatDates(data) {
    var dateArray = data.split("-");
    var dateFormat = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
    return dateFormat
}

// function renderStorage() {

//     // Add value of searchBar to front of savedSearch array; splice values..?
//     // Also place value at front of array if duplicate; maybe unshift??

//     // Save to localStorage

//     // Creates historyList forLoop

//     // Click listner for list items

// }

// // searchBtn click listner; preventDefault
// $("#searchBtn").click(function(event) {

//     // Fxns to request get data

// });

// function getCurrent() {
//     // Current Weather API call

//         // Create object to store current weather data

//         // Format object date

//         // Call to get UV index 

//             // Assign uvIntensity based on uvIndex number

//             // Create card & append HTML elements for current weather data

// }

// function getForecast() {
        // Array for looped forecast data?

//      // Forecast Weather API call

//         // forLoop to retrieve then push to forecast array

//         // forLoop to format dates for array of objects

//         // forLoop to create cards & append HTML elements for relevant forecast data

// }

// Run search on pressing Enter


renderStorage();