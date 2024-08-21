//variables defined based on html elements
const locationInput = document.getElementById("location-input");
const locationSearch = document.getElementById("location-search");
const locationDisplay = document.getElementById("location-display");
const currentWeatherIcon = document.getElementById("current-weather-icon");
const currentSummary = document.getElementById("current-summary");
const forecast = document.getElementById("forecast");
const currentDate = document.getElementById("current-date");



//add eventlistener for click on mouse which triggers click event and calls the callAPI function
locationSearch.addEventListener("click", function (event) {

    event.preventDefault();
    callAPI();
});


// openweathermap.api used 
let apiKey = '752dd876d2d8e2f3f4886c7c478bb5d5';

// function set up to call the api and add promises
function callAPI() {
    let locationName = locationInput.value;



    //pop up to prompt if user has clicked submit without adding a location in the input box
    if (locationName === "") {
        alert("Please add a location to search for");
    }

    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(function (response) {
            //add modal if api fails to load
            if (!response.ok) {
                alert("API failed to load");
            }
            //return response from api as a json data to allow data to be extracted
            return response.json();




        })
        .then(function (data) {
                //sending an alert if the data isn't available

                console.log(data);
                if (data.cod !== "200") {
                    alert("something went wrong");
                }


                //set the data for current day

                //add today's date
                currentDate.innerText = data.list[0].dt_txt;
                //convert temperature to integer
                let temperatureToday = Math.round(data.list[0].main.temp);
                console.log(temperatureToday);

                document.getElementById("current-temperature").innerHTML = `Today's temperature: ${temperatureToday}°C`;

//set weather icon to correct one for the day
                let iconToday = data.list[0].weather[0].icon;
                console.log("Icon code:", iconToday);
                currentWeatherIcon.src = `/icons/${iconToday}.png`;
                console.log(`<img src ="/icons/${iconToday}.png">`);





                //add current location to html and uppercase first letter                 

                currentSummary.innerText = data.list[0].weather[0].description;

                locationDisplay.innerText = locationName.charAt(0).toUpperCase() + locationName.slice(1);

                //add date




                // add forecast via function below to next four days
                addForecast(data.list[1], 1);
                addForecast(data.list[2], 2);
                addForecast(data.list[3], 3);
                addForecast(data.list[4], 4);
            }



        )

    // function to call data for each day and add to html using a template literal
    function addForecast(data, day) {
        let temperature = `${Math.round(data.main.temp)}°C`;
        // console.log(temperature);
        let date = `Date/time <br>${data.dt_txt}`;
        let summary = `
        ${data.weather[0].description}`;
        let windSpeed = `Wind speed <br>
        ${data.wind.speed} m/s`;
        // let icon = `/icons/${data.weather[0].icon}.png`;

        let iconCode = data.weather[0].icon;
        let iconUrl = `/icons/${iconCode}.png`;
        
        

        let forecastString = `<div>${date} <br>${temperature} <br> <img src="${iconUrl}" alt="${summary}"><br>${summary}<br>${windSpeed} </div>`;
        document.getElementById("forecast").innerHTML += forecastString;

    }

}

// let testBackground = document.getElementById("background");
// let toggleBackground = document.getElementById("toggle-weather");

// function toggleWeather() {
//     console.log("hello");
//     // testBackground.style.backgroundColor = "lightblue";
//     testBackground.style.backgroundImage = "url('../images/rain.jpg')";
//     // testBackground.classList.toggle("test");
//     testBackground.classList.toggle("test2");

//     // background.classList.toggle('image1');
//     // background.classList.toggle('image2');
// }
// toggleBackground.addEventListener("click", toggleWeather);