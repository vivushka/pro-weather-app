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

function displayWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#main-temperature");
  let cityElement = document.querySelector("#current-city");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#feels-like");
  let iconElement = document.querySelector("#main-icon");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );
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

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#main-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  document.querySelector("#current-city").innerHTML = response.data.name;
}

let currentButton = document.querySelector(".btn-geo");
currentButton.addEventListener("click", getCurrentPosition);

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#main-temperature");
//   temperatureElement.innerHTML = 64;
// }
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#main-temperature");
//   temperatureElement.innerHTML = 18;
// }
// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);
