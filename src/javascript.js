let currentDate = new Date();
console.log(currentDate);

function formatDate(currentDate) {
  let date = currentDate.getDate();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = currentDate.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let month = months[currentDate.getMonth()];
  let day = days[currentDate.getDay()];
  return `${day}, ${date} ${month}<br />
  ${hours}:${minutes}`;
}
console.log(formatDate(currentDate));

let todayElement = document.querySelector("#today");
todayElement.innerHTML = formatDate(currentDate);

function find(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "c1f9fba0b38d3c38890fede647fd29cb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
     <img src="images/${forecastDay.weather[0].icon}.svg"
          width="50"
          />
     <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
     </div> 
     </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "c1f9fba0b38d3c38890fede647fd29cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#main-temperature");
  let cityElement = document.querySelector("#current-city");
  let countryElement = document.querySelector("#current-country");
  let descriptionElement = document.querySelector("#current-description");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#main-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );
  getForecast(response.data.coord);
}

let searchForm = document.querySelector("#search-city");
searchForm = document.addEventListener("submit", find);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}

function myPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c1f9fba0b38d3c38890fede647fd29cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

let currentButton = document.querySelector(".btn-geo");
currentButton.addEventListener("click", getCurrentPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#main-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
