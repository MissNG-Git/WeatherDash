var apiKey = "f6e64506bbf2ed97516451a25d139a01";
// var to 'select' & 'createElements'?

// !! Remember document ready & prevent defaults !!

// "click" eventListener for buttons
    // Search button runs weather & forecast functions

    // Trash button deletes local storage data & resets search history


// Run currentWeather Function

// Run fiveDayForecast Function


// currentWeather Function
    // API call URL: Current Weather Data
    var weatherURL = "api.openweathermap.org/data/2.5/weather?q=" + {city name} + "&appid=" + apiKey;
    // API Ajax call

    // Store response

// fiveDayForecast Function
    // API call URL: 5 Day
    var forecastURL = "api.openweathermap.org/data/2.5/forecast?q=" + {city name} + "&appid=" + apiKey;
    // API Ajax call

    // Store responses (x5 for each day)

    // Temperature conversion

    // Append to HTML