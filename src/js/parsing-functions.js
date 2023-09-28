import { getCurrentWeather, getForecastWeather } from "./api-functions";
import { startLoadingAnimation, buildCurrentSection, buildForecastSection, buildTomorrowSection } from "./html-elements";

// Currently using to try input twice, then throw error
let count;

const getInput = (e) => {
    count = 0;
    e.preventDefault();
    startLoadingAnimation();
    const input = document.getElementById("search-input");
    const value = input.value;
    input.value = "";
    parseInput(value);
  };

const parseInput = async (value) => {
    // If zipcode, search by zipcode
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
      value = `zip=${value},us`;
    }
    // Otherwise, search by city name
    else {
      value = `q=${value}`;
    }

    const apiKey = "90896309f65adc38c814061d0ba7a858";
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?${value}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${value}&appid=${apiKey}&units=imperial`;

    const current = await getCurrentWeather(currentUrl, value);
    setCurrentWeather(current);

    const forecastValue = `lat=${current.coord.lat}&lon=${current.coord.lon}`;
    const forecast = await getForecastWeather(forecastUrl, forecastValue);
    parseForecast(forecast);
  };

  const setCurrentWeather = (weather) => {
    const cityName = weather.name;
    const temp = Math.round(weather.main.temp) + "°F";
    const description = weather.weather[0].description;
    const icon = weather.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

    buildCurrentSection(cityName, temp, description, iconUrl);
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

  const setForecast = (time) => {
    const timeName = time.timeName;
    const temp = Math.round(time.main.temp) + "°F";
    const description = time.weather[0].description;
    const icon = time.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

    buildTomorrowSection(timeName, temp, description, iconUrl);
  };

  export {
    getInput
  }
