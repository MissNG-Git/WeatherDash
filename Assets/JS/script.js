var searchBar = $("#searchBar");
var searchBtn = $("#searchBtn");
var searchHistory = $("#searchHistory");
var apiKey = "471ac66dcee7336c8919fa741ccc6ad6";
var weatherURL;
var forecastURL;
var savedSearch = [];

var loadStorage = localStorage.getItem("savedSearch");
if (loadStorage != null) {
    savedSearch = loadStorage.split(",");
}
var today = new Date();
var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

// Change format of date to Mo / Day / Yr for simplicity
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

    localStorage.setItem("savedSearch", savedSearch);

    for (var i = 0; i < savedSearch.length; i++) {
        var newLi = $('<li class="list-group-item">' + savedSearch[i] + '</li>');
        $("#searchHistory").append(newLi);
    }

    $("li").on("click", function (event) {
        event.preventDefault();
        $("#searchBar").val($(event.target).text());
        searchBtn.click();
    });
}

$("#searchBtn").click(function(event) {
    event.preventDefault();
    weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchBar.val() + "&units=imperial&appid=" + apiKey;
    
    $("#currentWeather").empty();
    $("#forecastWeather").empty();
    let city = $("#searchBar").val().trim();
    if(city.length <= 0) {
        alert("Please enter a city name.");
    }
    
    getCurrent();
    getForecast();
});

$("#dltBtn").click(function(event) {
    event.preventDefault();
    localStorage.removeItem("savedSearch");
    $("#searchHistory", ).remove();
    $(".weatherContainer").remove();
    location.reload();
});

// Reset text box = blank after search
// CSS list text to UPPERCASE

function getCurrent() {
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
        currentObject.date = formatDates(currentObject.date);

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uviURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

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
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        var forecastObject;

        // Create forLoops push data to forecast array, format dates & create card elements for appending
        for (var i = 4; i < response.list.length; i += 8) {
            forecastObject = {
                date: response.list[i].dt_txt.split(" ")[0],
                weatherIcon: response.list[i].weather[0].icon,
                temperature: Math.round(response.list[i].main.temp),
                humidity: response.list[i].main.humidity
            };
            forecastArray.push(forecastObject);
        }

        for (var i = 0; i < forecastArray.length; i++) {
            forecastArray[i].date = formatDates(forecastArray[i].date);
        }

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