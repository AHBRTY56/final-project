function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let wetElement = document.querySelector("#wet");
  wetElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
}
let apiKey = "bc7dota507232177ccef048eb1a1ae2a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kharkiv&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
