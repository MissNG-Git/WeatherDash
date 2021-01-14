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

function renderStorage() {
    $("#searchHistory").empty();

    // Add value of searchBar to front of savedSearch array
    // Also place value at front of array if duplicate
    if ($("#searchBar").val() != "") {
        if (savedSearch.indexOf($("#searchBar").val()) != -1) {
            savedSearch.splice(savedSearch.indexOf($("#searchBar").val()), 1)
        }
        savedSearch.unshift($("#searchBar").val());
    }

    // Save to localStorage
    localStorage.setItem("savedSearch", savedSearch);

    // Creates historyList
    for (var i = 0; i < savedSearch.length; i++) {
        var newLi = $('<li class="list-group-item">' + savedSearch[i] + '</li>');
        $("#searchHistory").append(newLi);
    }

    // Click listner for list items
    $("li").on("click", function (event) {
        event.preventDefault();
        $("#searchBar").val($(event.target).text());
        searchBtn.click();
    });
}

// searchBtn click listner; preventDefault
$("#searchBtn").click(function(event) {
    event.preventDefault();
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;
    console.log(weatherURL);
    console.log(forecastURL);
    // Prevent duplicates
    $("#currentWeather").empty();
    $("#forecastWeather").empty();
    // Fxns to request get data
    getCurrent();
    getForecast();
});

$("#dltBtn").click(function(event) {
    event.preventDefault();
    localStorage.removeItem("savedSearch");
    $("#searchHistory", ).remove();
    $(".weatherContainer").remove();
});

// Reset text box = blank after search
// CSS list text to UPPERCASE
// Fix load after clicked dltBtn

function getCurrent() {
    // Current Weather API call
    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {
        // Create object to store current weather data
        var currentObject = {
            location: response.name,
            date: currentDate,
            weatherIcon: response.weather[0].icon,
            temperature: Math.round(response.main.temp),
            humidity: response.main.humidity,
            wind: response.wind.speed,
            uvIndex: 0,
            uvIntensity: ""
        };
        console.log(currentObject);
        // Format object date
        currentObject.date = formatDates(currentObject.date);
        console.log(currentObject.date);

        // Call to get UV index 
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        console.log(latitude);
        console.log(longitude);
        console.log(uviURL);

        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function (response2) {
            currentObject.uvIndex = response2.value;

            // Assign uvIntensity based on uvIndex number & style in CSS
            if (currentObject.uvIndex >= 8)
                currentObject.uvIntensity = "high";
            else if (currentObject.uvIndex < 3)
                currentObject.uvIntensity = "low";
            else
                currentObject.uvIntensity = "medium";

            // Create card & append HTML elements for current weather data
            var currentCard = $('<div class="card"><div class="card-body"><h5 class="card-title">' + 'Current weather in ' + currentObject.location + ' (' + currentObject.date + ') ' +
                '<span class="badge badge-primary"><img id="weather-icon" src="http://openweathermap.org/img/wn/' + currentObject.weatherIcon + '@2x.png"></span></h5>' +
                '<p class="card-text">Temperature: ' + currentObject.temperature + ' °F</p>' +
                '<p class="card-text">Humidity: ' + currentObject.humidity + '%</p>' +
                '<p class="card-text">Wind Speed: ' + currentObject.wind + ' MPH</p>' +
                '<p class="card-text">UV Index: <span class="badge badge-secondary ' + currentObject.uvIntensity + '">' + currentObject.uvIndex + '</span>')
            $("#currentWeather").append(currentCard);
        });

        renderStorage();
    });
}

function getForecast() {
    var forecastArray = [];
    // Forecast Weather API call
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var forecastObject;

        // forLoop to retrieve then push to forecast array
        for (var i = 4; i < response.list.length; i += 8) {
            forecastObject = {
                date: response.list[i].dt_txt.split(" ")[0],
                weatherIcon: response.list[i].weather[0].icon,
                temperature: Math.round(response.list[i].main.temp),
                humidity: response.list[i].main.humidity
            };
            forecastArray.push(forecastObject);
        }

        // forLoop to format dates for array of objects
        for (var i = 0; i < forecastArray.length; i++) {
            forecastArray[i].date = formatDates(forecastArray[i].date);
        }

        // forLoop to create cards & append HTML elements for relevant forecast data
        for (var i = 0; i < forecastArray.length; i++) {
            var forecastCard = $('<div class="col-lg-2 col-sm-3 mb-1"><span class="badge badge-primary"><h5>' + forecastArray[i].date + '</h5>' +
                '<p><img class="w-100" src="http://openweathermap.org/img/wn/' + forecastArray[i].weatherIcon + '@2x.png"></p>' +
                '<p>Temp: ' + forecastArray[i].temperature + '°F</p>' +
                '<p>Humidity: ' + forecastArray[i].humidity + '%</p>' +
                '<span></div>');
            $("#forecastWeather").append(forecastCard);
        }
    });
}

renderStorage(); 