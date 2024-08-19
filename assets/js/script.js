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

    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
//set the data for current day
                console.log(data);
                let temperatureToday = data.list[0].main.temp;
                console.log(temperatureToday);
                document.getElementById("current-temperature").innerHTML = `Today's temperature: ${temperatureToday}`;

                // let iconToday = data.list[0].weather[0].icon;
                // console.log(iconToday);
                // currentWeatherIcon.innerHTML = '<image src="https://openweathermap.org/img/wn/04d@2x.png"></image>';
//add current location to html and uppercase first letter                 

                currentSummary.innerText = data.list[0].weather[0].description;

                locationDisplay.innerText = locationName.charAt(0).toUpperCase() + locationName.slice(1);


            }

        )

}