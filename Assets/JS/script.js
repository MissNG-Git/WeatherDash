var apiKey = "&appid=f6e64506bbf2ed97516451a25d139a01";
var weatherURL = "api.openweathermap.org/data/2.5/weather?q=";
var forecastURL = "api.openweathermap.org/data/2.5/forecast?q=";
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
historyClick();
resetClick();

// Load localStorage data on refresh & create buttons for previous search(es)
function loadHistory() {
    // Get savedCities from localStorage; set to city var (empty array) if none
    let savedCities = JSON.parse(window.localStorage.getItem("savedHistory")) || searchHistory;
    if (savedCities !== null) {
        searchHistory = savedCities;
    }
    renderBtns();
}

function renderBtns () {
    $("#searchHistory").html("");
    if (searchHistory == null) {
        return;
    }
    // Loop through array, create buttons for each city & run weatherAPI when clicked
    for (let i = 0; i < searchHistory.length; i++) {
        let btnEl = $("<button>");
        btnEl.attr("id", "btnItems");
        btnEl.text(searchHistory[i].city.toUpperCase());
        console.log(searchHistory[i].city);
        $("#searchHistory").append(btnEl);
        $("#btnItems").click(function(event) {
            event.preventDefault();
            city = $(this).text().trim();
            weatherAPI();
        });
    }
}

// Function for click event on searchBtn
function searchAction() {
    $("#searchBtn").click(function(event) {
        event.preventDefault();
        city = $("#searchBar").val().trim();
        // Change to modal if time permits...
        if(city.length <= 0) {
            alert("Please enter a city name.");
        }
        else {
            // Limit list to only show last 10 search results
            if (searchHistory.length > 10) {
                searchHistory.shift();
            }
            let savedCities = JSON.parse(window.localStorage.getItem("savedHistory")) || searchHistory;
            searchHistory = {
                city: city
            }
            savedCities.push(searchHistory);
            window.localStorage.setItem("savedHistory", JSON.stringify(savedCities));
            renderBtns();
            // weatherAPI();
        }
    });
}

// function historyClick() {

// }

// Trash button deletes local storage data & resets search history
function resetClick() {
    $("#dltBtn").click(function(event) {
        event.preventDefault();
        window.localStorage.removeItem("savedHistory");
        $("#searchHistory").remove();
    });
}

// currentWeather Function
function weatherAPI() {
    
    // Current Weather API Ajax call
    $.ajax({
        url: weatherURL,
        method: "GET"
    });
    
    // Forecast API Ajax call
    $.ajax({
        url: forecastURL,
        method: "GET"
    });

    // Temperature conversion

    // Append to HTML

}