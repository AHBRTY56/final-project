function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastelement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  
        
              <div class="col-2">
                <div class="date-forecast">${formatDay(forecastDay.dt)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/${
                    forecastDay.weather[0].icon
                  }.png"
                  alt="clouds"
                  width="44"
                />
                <div class="weather-forecast-temperatures">
                  <span class="temp-max"> ${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="temp-min"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
           
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastelement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let wetElement = document.querySelector("#wet");
  wetElement.innerHTML = response.data.temperature.humidity;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let picElement = document.querySelector("#pic");
  picElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "bc7dota507232177ccef048eb1a1ae2a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");

  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let temperatureFahr = document.querySelector("#temperature");
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;

//   temperatureFahr.innerHTML = Math.round(fahrenheitTemp);
// }
// let celsiusTemperature = null;
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("Kiev");
