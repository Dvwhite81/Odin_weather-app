let count;
const initialSetup = () => {
  // Wait until after animation to change background color
  const svg = document.querySelector("svg");
  const input = document.getElementById("search-input");
  setTimeout(() => {
    svg.style.backgroundColor = "white";
    svg.style.color = "black";
    input.setAttribute("placeholder", "Enter a city or zip");
  }, 4000);

  // Set up listener for search
  const form = document.getElementById("form");
  form.addEventListener("submit", getInput);
};

const getInput = (e) => {
  count = 0;
  e.preventDefault();
  const input = document.getElementById("search-input");
  const value = input.value;
  input.value = "";
  parseInput(value);
};

const parseInput = async (value) => {
  // Check if zipcode
  if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
    value = `zip=${value},us`;
  } else {
    value = `q=${value}`;
  }

  const current = await getCurrentWeather(value);
  setCurrentWeather(current);

  const forecastValue = `lat=${current.coord.lat}&lon=${current.coord.lon}`;
  const forecast = await getForecastWeather(forecastValue);
  parseForecast(forecast);
};

const getCurrentWeather = async (value) => {
  const apiKey = "90896309f65adc38c814061d0ba7a858";
  const url = `https://api.openweathermap.org/data/2.5/weather?${value}&appid=${apiKey}&units=imperial`;

  const results = await tryCatch(url, value);
  return results;
};

const getForecastWeather = async (value) => {
  const apiKey = "90896309f65adc38c814061d0ba7a858";
  const url = `https://api.openweathermap.org/data/2.5/forecast?${value}&appid=${apiKey}&units=imperial`;

  const results = await tryCatch(url, value);
  return results;
};

const tryCatch = async (url, value) => {
  try {
    const data = await fetch(url);

    if (!data.ok) {
      count++;
      if (count > 2) {
        throw Error;
      }

      let splitComma = value.split(",")[0];

      let splitEquals = splitComma.split("=");
      value = splitEquals[1];
      parseInput(value);
    }
    const weather = await data.json();
    return weather;
  } catch (error) {
    console.error("ERROR", error);
    alert("Try a different city");
  }
};

const setCurrentWeather = (weather) => {
  const cityName = weather.name;
  const temp = weather.main.temp + "°F";
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  buildCurrentSection(cityName, temp, description, iconUrl);
};

const buildCurrentSection = (cityName, temp, description, iconUrl) => {
  const main = document.querySelector(".main");
  main.innerHTML = "";

  const conditions = buildElement("h1", { textContent: "Current Conditions:" });
  main.append(conditions);

  const currentResults = buildElement("div", { className: "current-results" });
  const nameEl = buildElement("h2", { id: "city-name", textContent: cityName });
  const tempEl = buildElement("h3", { id: "current-temp", textContent: temp });
  const descriptionEl = buildElement("p", {
    id: "current-description",
    textContent: description,
  });
  const iconEl = buildElement("img", { id: "current-icon", src: iconUrl });
  currentResults.append(nameEl, tempEl, descriptionEl, iconEl);
  main.append(currentResults);
};

const parseForecast = (weather) => {
  const [morning, noon, evening] = [
    weather.list[3],
    weather.list[5],
    weather.list[7],
  ];
  morning.timeName = "6:00 am";
  noon.timeName = "12:00 pm";
  evening.timeName = "6:00 pm";

  const times = [morning, noon, evening];
  buildForecastSection();
  times.forEach((time) => setForecast(time));
};

const buildForecastSection = () => {
    const main = document.querySelector(".main");
    const tmwDiv = buildElement("div", { className: "tomorrow" });
    const tmwH2 = buildElement("h2", { textContent: "Tomorrow:" });
    const tmwSection = buildElement("div", {className: "tomorrow-forecasts"});

    tmwDiv.append(tmwH2, tmwSection);

    main.append(tmwDiv);
}

const setForecast = (time) => {
  const timeName = time.timeName;
  const temp = time.main.temp + "°F";
  const description = time.weather[0].description;
  const icon = time.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  buildTomorrowSection(timeName, temp, description, iconUrl);
};

const buildTomorrowSection = (timeName, temp, description, iconUrl) => {
    const tmwSection = document.querySelector(".tomorrow-forecasts");
    const forecastResults = buildElement("div", {
        className: "forecast-results",
      });
      const nameEl = buildElement("h3", {
        className: "forecast-name",
        textContent: timeName,
      });
      const tempEl = buildElement("h4", {
        className: "forecast-temp",
        textContent: temp,
      });
      const descriptionEl = buildElement("p", {
        className: "forecast-description",
        textContent: description,
      });
      const iconEl = buildElement("img", {
        className: "current-icon",
        src: iconUrl,
      });
      forecastResults.append(nameEl, tempEl, descriptionEl, iconEl);
      tmwSection.append(forecastResults);
}

const buildElement = (type, args) => {
  const element = document.createElement(type);

  for (const key in args) {
    element[key] = args[key];
  }

  return element;
};

initialSetup();
