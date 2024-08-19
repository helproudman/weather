//variables defined based onn html elements
const locationInput = document.getElementById("location-input");
const locationSearch = document.getElementById("location-search");
const locationDisplay = document.getElementById("location-display");
const currentWeatherIcon = document.getElementById("current-weather-icon");
const currentSummary = document.getElementById("current-summary");
const forecast = document.getElementById("forecast");

locationSearch.addEventListener("click", callAPI);

//openweathermap.api used 
let apiKey = '752dd876d2d8e2f3f4886c7c478bb5d5';

// function set up to call the api and add promises
function callAPI() {
    let locationName = locationInput.value;

    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
                console.log(data);
                let temperatureToday = data.main.temp;
                console.log(temperatureToday);
                document.getElementById("current-temperature").innerHTML = `Today's temperature: ${temperatureToday}`;
            }

        )
        
}