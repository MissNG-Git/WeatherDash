var city = "";
var apiKey = "&appid=471ac66dcee7336c8919fa741ccc6ad6";
var weatherURL = "https://api.openweathermap.org/data/2.5//weather?q=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
// Array for search History?
var searchHistory = [];

// !! Remember document ready & prevent defaults == shorthand? !!
// Function calls on page load
loadHistory();
listClick();
searchAction();
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
    if (searchHistory === null) {
        return;
    }
    let newCities = [...new Set(searchHistory)]
    // Loop through array, create buttons for each city & run weatherAPI when clicked
    for (let i = 0; i < newCities.length; i++) {
        let cityName = newCities[i];
        let btnEl = document.createElement("button");
        btnEl.setAttribute("id", "btnItems");
        btnEl.textContent = cityName;
        console.log(cityName)
        $("#searchHistory").append(btnEl);
        listClick();
    }
}

function listClick() {
    $("#btnItems").click(function(event) {
        event.preventDefault();
        city = $(this).text().trim();
        $("#weatherHeader").text("Current Weather in " + city);
        weatherAPI();
    });
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
            // if (searchHistory.length > 10) {
            //     searchHistory.shift();
            // }
            $("#weatherHeader").text("Current Weather in " + city);
            $("form").trigger("reset");
            // ADD IF STATEMENT FOR INPUT !== A VALID CITY!
            searchHistory.push(city);
            window.localStorage.setItem("savedHistory", JSON.stringify(searchHistory))
            savedCities = searchHistory;
            renderBtns();
            weatherAPI();
        }
    });
}

// Trash button deletes local storage data & resets search history
function resetClick() {
    $("#dltBtn").click(function(event) {
        event.preventDefault();
        window.localStorage.removeItem("savedHistory");
        $("#searchHistory", ).remove();
        $("#currentWeather").remove();
    });
    // FIX searchACTION AFTER CLEARING HISTORY!!!
}

// currentWeather Function
function weatherAPI() {
    let queryCurrentURL = weatherURL + city + apiKey;
    let queryForecastURL = forecastURL + city + apiKey;
    console.log(queryCurrentURL);
        
    // Current Weather API Ajax call
    $.get(queryCurrentURL, function(response) {
        let temp = Math.round((( response.main.temp - 273.15) * 9/5 + 32))
        console.log("The temperature in " + city + " is: " + temp);
        
        $("#temp").text("Temperature: " + temp + String.fromCharCode(176)+"F");
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind").text("Wind Speed: " +  response.wind.speed);
        // // Fix UV index
        // $("#uv").text("UV Index: " +  ...);
        $(".currentIcon").attr({"src": "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"});    
    });

    // $.get(queryForecastURL, function(response) {
        
    // });
}      

    // Temperature conversion

    // Append to HTML