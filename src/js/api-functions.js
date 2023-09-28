  import { parseInput } from "./parsing-functions";
  let count;

  const getCurrentWeather = async (currentUrl, value) => {
    const results = await tryCatch(currentUrl, value);
    return results;
  };

  const getForecastWeather = async (forecastUrl, value) => {
    const results = await tryCatch(forecastUrl, value);
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
        await parseInput(value);
      }
      const weather = await data.json();
      return weather;
    } catch (error) {
      console.error("ERROR", error);
      alert("Try a different city");
    }
  };

  export {
    getCurrentWeather,
    getForecastWeather
  }
