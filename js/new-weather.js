const weatherContainer = document.getElementById("weather-container");

const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=41.34&longitude=-73.03&daily=temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,winddirection_10m_dominant,weather_code&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const maxWinds = data.daily.wind_speed_10m_max;
    const weatherCodes = data.daily.weather_code;
    const uvIndexes = data.daily.uv_index_max;
    const windDirections = data.daily.uv_index_max;

    for (let i = 0; i < 7; i++) {

      // Outer card — holds the background image
      const card = document.createElement("div");
      card.classList.add("card");

      // Inner container — holds all the text content
      const inner = document.createElement("div");
      inner.classList.add("card-inner");

      const date = document.createElement("h2");
      date.textContent = dates[i];

      const maxTemp = document.createElement("p");
      maxTemp.textContent = "High: " + maxTemps[i] + "°F";

      const minTemp = document.createElement("p");
      minTemp.textContent = "Low: " + minTemps[i] + "°F";

      const maxWind = document.createElement("p");
      maxWind.textContent = "Max wind: " + maxWinds[i] + "mph";

      const weatherCode = document.createElement("p");
      weatherCode.textContent = "Weather code: " + weatherCodes[i];

      const uvIndex = document.createElement("p");
      uvIndex.textContent = "UV index: " + uvIndexes[i];

      const windDirection = document.createElement("p");
      windDirection.textContent = "Wind direction " + windDirections[i];

      /* Weather image logic — sets background on the card */
      let imageFile = "assets/sunny.jpg";

      if (weatherCodes[i] >= 0 && weatherCodes[i] <= 1) {
        imageFile = "assets/sunny.jpg";
      } else if (weatherCodes[i] >= 50 && weatherCodes[i] <= 69) {
        imageFile = "assets/rain.jpg";
      } else if (weatherCodes[i] === 71 || weatherCodes[i] === 73 || weatherCodes[i] === 75) {
        imageFile = "assets/snow.jpg";
      } else if (weatherCodes[i] >= 40 && weatherCodes[i] <= 49) {
        imageFile = "assets/fog.jpg";
      }

      // Apply image as card background instead of an <img> element
      card.style.backgroundImage = `url('${imageFile}')`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";

      /* Wind icon logic */
      let windImageFile = "assets/light.png";

      if (maxWinds[i] < 10) {
        windImageFile = "assets/light.png";
      } else if (maxWinds[i] < 20) {
        windImageFile = "assets/moderate.png";
      } else if (maxWinds[i] < 40) {
        windImageFile = "assets/strong.png";
      } else {  windImageFile = "assets/wind-strong.png";}

      const windIcon = document.createElement("img");
      windIcon.src = windImageFile;
      windIcon.alt = "Wind strength icon";
      windIcon.classList.add("wind-icon");

      // Append all content to inner, not card
      inner.appendChild(date);
      inner.appendChild(maxTemp);
      inner.appendChild(minTemp);
      inner.appendChild(uvIndex);
      inner.appendChild(maxWind);
      inner.appendChild(weatherCode);
      inner.appendChild(windIcon);

      // Inner goes into card, card goes into container
      card.appendChild(inner);
      weatherContainer.appendChild(card);
    }
  })
  .catch(error => {
    weatherContainer.innerHTML = "<p>Sorry, weather data could not be loaded.</p>";
    console.error("Error fetching weather data:", error);
  });